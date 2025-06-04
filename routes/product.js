import express from "express";
import authMiddleware from "../middleware/auth.js";
import requireAdmin from "../middleware/require_role.js";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/productController.js";

const products = express.Router();

products.get("/", getAllProducts);

products.get("/:id", getProductById);

products.post("/",authMiddleware,requireAdmin, createProduct);

products.put("/:id",authMiddleware, requireAdmin, updateProduct);

products.delete("/:id",authMiddleware, requireAdmin, deleteProduct)

export default products;
