import Category from "../models/Category.js";

// ✅ Add Category: /api/category/add
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exist = await Category.findOne({ name });
    if (exist) {
      return res.json({ success: false, message: "Category already exists" });
    }
    await Category.create({ name, description });
    res.json({ success: true, message: "Category Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// ✅ List Categories: /api/category/list
export const categoryList = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, categories });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ success: true, categories });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }

}