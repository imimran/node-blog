
import mongoose, { Schema } from "mongoose";

//user model
const CategorySchema = new Schema(
  {
    name : {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchema);

export default Category;