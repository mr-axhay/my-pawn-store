import "../models/connection.js";
import cloudinary from "../config/cloudinary.js";
//to link subcategory model
import SubCategorySchemaModel from "../models/subcategory.model.js";
import CategorySchemaModel from "../models/category.model.js";

export const save = async (req, res) => {
  const scategory = await SubCategorySchemaModel.find();
  const l = scategory.length;
  const _id = l == 0 ? 1 : scategory[l - 1]._id + 1;

  const caticon = req.files.caticon;
  const result = await cloudinary.uploader.upload(caticon.tempFilePath, {
    folder: "pawnshop_subcaticons",
  });

  const scDetails = {
    ...req.body,
    subcaticonnm: result.secure_url,
    _id: _id,
  };
  try {
    await SubCategorySchemaModel.create(scDetails);
    // caticon.mv(uploadfilepath);
    res.status(201).json({ status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
};

export const fetch = async (req, res) => {
  var condition_obj = req.query;
  var scList = await SubCategorySchemaModel.find(condition_obj);
  var category = await CategorySchemaModel.findOne({_id:condition_obj.catnm});
  console.log(category)
  if (scList.length != 0)
    res
      .status(200)
      .json({ status: true, info: scList, catName: category.catnm });
  else res.status(404).json({ status: false });
};

export var deleteSubCategory = async (req, res) => {
  try {
    let scDetails = await SubCategorySchemaModel.findOne(
      JSON.parse(req.body.condition_obj),
    );
    if (scDetails) {
      await SubCategorySchemaModel.deleteOne(
        JSON.parse(req.body.condition_obj),
      );
      var scList = await SubCategorySchemaModel.find();
      try {
        res.status(200).json({ status: true, info: scList });
      } catch {
        res.status(404).json({ status: "Requested resource not available" });
      }
    }
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var update = async (req, res) => {
  try {
    let cDetails = await CategorySchemaModel.findOne(
      JSON.parse(req.body.condition_obj),
    );
    if (cDetails) {
      let category = await CategorySchemaModel.updateMany(
        JSON.parse(req.body.condition_obj),
        { $set: JSON.parse(req.body.content_obj) },
      );
      if (category) res.status(200).json({ status: true });
      else res.status(500).json({ status: false });
    } else res.status(404).json({ status: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
