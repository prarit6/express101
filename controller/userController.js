import usersModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getAllUsers(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5; //limit data = 5
    const after_id = req.query.after_id; // after_id is the last id of the previous data

    const query = after_id ? { _id: { $gt: after_id } } : {}; // ? after_id is provide, get data after that id : get all data

    const users = await usersModel.find(query).limit(limit).sort({ _id: 1 }); // find users with query, limit 5 data, sort by id
    const hashMore = users.length === limit; // ? length = limit, more users to fetch : no more users to fetch
    const nextAfterId = hashMore ? users[users.length - 1]._id : null; // ? get last id users : no next id get null

    res.status(200).json({
      status: "Success",
      code: "GET_ALL_USERS",
      message: "Get all users success",
      data: users,
      hasMore: hashMore,
      nextAfterId: nextAfterId,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      status: "Fail",
      code: "USER_NOT_FOUND",
      message: "Fail to get all users",
      error: err.message,
    });
  }
}

async function createUser(req, res) {
  try {
    const createUsers = await usersModel.create(req.body);
    res.status(201).json({
      status: "Success",
      code: "CREATED_USER",
      message: "Create user success",
      data: createUsers,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({
      status: "Fail",
      code: "USER_NOT_CREATE",
      message: "Fail to create user",
      error: err.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "Fail",
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Fail",
        code: "INVALID_PASSWORD",
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    
    res.status(200).json({
      status: "Success",
      code: "USER_LOGIN_SUCCESS",
      message: "User logged in successfully",
      token,
      data: {id: user.id, name:user.name, email:user.email},
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(400).json({
      status: "Fail",
      code: "USER_NOT_LOGIN",
      message: "Fail to login user",
      error: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const deleteUser = await usersModel.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      return res.status(200).json({
        status: "Success",
        code: "DELETED_USER_SUCCESS",
        message: "User deleted successfully",
        data: deleteUser,
      });
    } else {
      return res.status(404).json({
        status: "Fail",
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(400).json({
      status: "Fail",
      code: "USER_NOT_DELETED",
      message: "Fail to delete user",
      error: err.message,
    });
  }
}

export { createUser, loginUser, getAllUsers, deleteUser };
