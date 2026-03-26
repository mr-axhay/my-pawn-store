import "../models/connection.js";
import sendWhatsAppMessage from "../utils/twilio.js";
//to link product model
import ProductSchemaModel from "../models/product.model.js";
import Evaluation from "../models/Evaluation.js";
import cloudinary from "../config/cloudinary.js";

export const save = async (req, res) => {
  try {
    const product = await ProductSchemaModel.find();
    const l = product.length;
    const _id = l === 0 ? 1 : product[l - 1]._id + 1;
    const caticon = req.files.caticon;

    // 🔥 Upload to Cloudinary instead of local storage
    console.log("FILE OBJECT:", caticon);
    const result = await cloudinary.uploader.upload(
      caticon.tempFilePath,
      {
        folder: "pawnshop_productIcons",
      }
    );

    const pDetails = {
      ...req.body,
      caticonnm: result.secure_url, // ✅ store URL instead of filename
      _id: _id,
      status: "In stock",
    };

    await ProductSchemaModel.create(pDetails);

    res.status(201).json({ status: true, data: pDetails });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false });
  }
};

export const fetch = async (req, res) => {
  try {
    // ✅ Decode all query params
    const decodedQuery = {};
    for (const key in req.query) {
      decodedQuery[key] = decodeURIComponent(req.query[key]);
    }

    const condition_obj = {
      ...decodedQuery,
      status: "In stock",
    };

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

    res.status(200).json({ status: true, info: finalData });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
};

export var deleteProduct = async (req, res) => {
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
//check for status here
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
