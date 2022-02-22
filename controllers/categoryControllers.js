import Category from "../models/category";

const addCategory = async (req, res) => {
  let { name } = req.body;

  //if email exist or not
  const foundCategory = await Category.findOne({
    name: name,
  });
  if (foundCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }
  const newCategory = new Category({ name });
  const category = await newCategory.save();
  return res
    .status(201)
    .json({ category: category, msg: "Category create successfully" });
};

const updateCategory = async (req, res) => {
  let { name } = req.body;
  const categoryId = req.params.categoryId;
  //if email exist or not
  const foundCategory = await Category.findOne({
    _id: categoryId,
  });
  if (!foundCategory) {
    return res.status(404).json({ message: "Category ID Not Found" });
  }

  const updateData = {
    name,
  };

  const options = { new: true, omitUndefined: true };
  const updateCategory = await Category.findOneAndUpdate(
    { _id: categoryId },
    updateData,
    options
  );
  return res.json({
    data: updateCategory,
    msg: "Category Update successfully",
  });
};

export default {
  addCategory,
  updateCategory,
};
