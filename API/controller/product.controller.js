import "../models/connection.js";
import url from 'url';
import path from 'path';
import rs from 'randomstring';

//to link category model
import ProductSchemaModel from "../models/product.model.js";

export const save=async(req,res)=>{
 const product=await ProductSchemaModel.find();
 const l=product.length;
 const _id=l==0?1:product[l-1]._id+1;

 const caticon=req.files.caticon;
 const caticonnm=rs.generate(10)+"_"+Date.now()+"_"+caticon.name;   

 const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
 const uploadfilepath = path.join(__dirname,'../../UI/public/assets/uploads/caticons',caticonnm);

 const pDetails={...req.body,"caticonnm":caticonnm,"_id":_id}; 
 try{
  await ProductSchemaModel.create(pDetails);
  
  caticon.mv(uploadfilepath);
  res.status(201).json({"status":true});  
 }
 catch {
  res.status(500).json({"status":false});   
 }
};

export const fetch=async(req,res)=>{
  var condition_obj=req.query; 
  var cList=await ProductSchemaModel.find(condition_obj);
  if(cList.length!=0)
    res.status(200).json({"status":true,"info":cList});
  else
    res.status(404).json({"status":false});    
};


export var deleteUser=async(req,res)=>{
  try{
    let pDetails = await ProductSchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(pDetails){
      let product=await ProductSchemaModel.deleteOne(JSON.parse(req.body.condition_obj));   
      if(product)
        res.status(200).json({"status":true});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":"Requested resource not available"});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};

export var update=async(req,res)=>{
  try{
    let pDetails = await ProductSchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(pDetails){
      let category=await ProductSchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
      if(category)
        res.status(200).json({"status":true});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":"Requested resource not available"});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};