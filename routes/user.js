import express from "express";
import authMiddleware from "../middleware/auth.js";
import requireAdmin from "../middleware/require_role.js";
import {
  getAllUsers,
  createUser,
  loginUser,
  deleteUser,
} from "../controller/userController.js";

const users = express.Router();
users.get("/", authMiddleware, requireAdmin, getAllUsers);
users.delete("/:id", authMiddleware, requireAdmin, deleteUser);
users.post("/register", createUser);
users.post("/login", loginUser);

export default users;
