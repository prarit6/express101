import express from "express";
import mongoose from "mongoose";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/productController.js";

const products = express.Router();

products.get("/", getAllProducts);

products.get("/:id", getProductById);

products.post("/", createProduct);

products.put("/:id", updateProduct);

products.delete("/:id", deleteProduct)

export default products;
