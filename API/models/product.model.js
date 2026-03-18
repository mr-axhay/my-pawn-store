import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema = mongoose.Schema({
  _id: Number,
  catnm: {
    type: String,
    required: [true,"Product name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true,"Product icon name is required"],
    trim: true
  }
});

//Apply the uniqueValidator plugin to CategorySchema.
ProductSchema.plugin(uniqueValidator);

//Compile schema to model
const ProductSchemaModel = mongoose.model('product_collection',ProductSchema);

export default ProductSchemaModel