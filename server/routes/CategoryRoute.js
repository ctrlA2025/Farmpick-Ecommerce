import express from "express";
import { addCategory, categoryList, getAllCategories } from "../controllers/CategoryController.js";

const CategoryRouter = express.Router();

CategoryRouter.post("/add", addCategory);
CategoryRouter.get("/list", categoryList);
CategoryRouter.get("/all", getAllCategories);

export default CategoryRouter;
