import express from "express";
import passportAuthMiddleware from "../middleware/passportAuth.js";
import requireAdmin from "../middleware/require_role.js";
import {
  getAllUsers,
  createUser,
  loginUser,
  deleteUser,
} from "../controller/userController.js";

const users = express.Router();
users.get("/", passportAuthMiddleware, requireAdmin, getAllUsers);

users.delete("/:id", passportAuthMiddleware, requireAdmin, deleteUser);
users.post("/register", createUser);
users.post("/login", loginUser);

export default users;
