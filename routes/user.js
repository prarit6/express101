import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controller/userController.js";

const users = express.Router();

//Get all users
users.get("/", getAllUsers);

//Get user by ID
users.get("/:id", getUserById);

//Create a new user
users.post("/", createUser)

//Update user by ID
users.put("/:id", updateUser);

//Delete user by ID
users.delete("/:id", deleteUser);

export default users;
