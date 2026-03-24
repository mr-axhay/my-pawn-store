import "../models/connection.js";
import url from "url";
import path from "path";
import rs from "randomstring";
import sendWhatsAppMessage from "../utils/twilio.js";
//to link product model
import ProductSchemaModel from "../models/product.model.js";
import Evaluation from "../models/Evaluation.js";

export const save = async (req, res) => {
  const product = await ProductSchemaModel.find();
  const l = product.length;
  const _id = l == 0 ? 1 : product[l - 1]._id + 1;

  const caticon = req.files.caticon;
  const caticonnm = rs.generate(10) + "_" + Date.now() + "_" + caticon.name;

  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const uploadfilepath = path.join(
    __dirname,
    "../../UI/public/assets/uploads/caticons",
    caticonnm,
  );

  const pDetails = { ...req.body, caticonnm: caticonnm, _id: _id };
  try {
    await ProductSchemaModel.create(pDetails);

    caticon.mv(uploadfilepath);
    // Send WhatsApp alert- commented as it will reduce the balance but it works!
    // await sendWhatsAppMessage(
    //   "+917746830045", // user/admin number
    //   `🛒 New Product Added!\n\nName: ${pDetails.catnm}`
    // );

    res.status(201).json({ status: true });
  } catch {
    res.status(500).json({ status: false });
  }
};

export const fetch = async (req, res) => {
  try {
    const condition_obj = req.query;
    console.log("condition_obj", condition_obj);

    // ✅ Fetch products
    const pList = await ProductSchemaModel.find(condition_obj);

    // ✅ Attach evaluation status
    const finalData = await Promise.all(
      pList.map(async (product) => {
        const evaluation = await Evaluation.findOne({
          productId: product._id,
        });

        return {
          ...product._doc,
          evaluationStatus: evaluation?.status || "not_requested",
        };
      })
    );

    // ✅ Send updated data
    res.status(200).json({ status: true, info: finalData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
};
export var deleteUser = async (req, res) => {
  const condition = JSON.parse(req.body.condition_obj);
  const { userId } = condition;
  try {
    let pDetails = await ProductSchemaModel.findOne(
      JSON.parse(req.body.condition_obj),
    );
    if (pDetails) {
      let product = await ProductSchemaModel.deleteOne(
        JSON.parse(req.body.condition_obj),
      );
      var pList = await ProductSchemaModel.find({ userId });
      if (pList.length != 0)
        res.status(200).json({ status: true, info: pList });
      else res.status(404).json({ status: false });
    } else res.status(404).json({ status: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var update = async (req, res) => {
  try {
    let pDetails = await ProductSchemaModel.findOne(
      JSON.parse(req.body.condition_obj),
    );
    if (pDetails) {
      let product = await ProductSchemaModel.updateOne(
        JSON.parse(req.body.condition_obj),
        { $set: JSON.parse(req.body.content_obj) },
      );
      if (product) res.status(200).json({ status: true });
      else res.status(500).json({ status: false });
    } else res.status(404).json({ status: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
