import express from "express";
import users from "./routes/user.js";
import products from "./routes/product.js";
import logger from "./middleware/logger.js";


//Import json and urlencoded middleware from express
import { json } from "express";

import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.x2c9g4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

// Create an instance of an Express application
const app = express();
//Define the port on which the server will listen
const port = 3000;

//Middleware to parse JSON body
app.use(json());

//Middleware to log requests
app.use(logger);

//Set up a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Set static folder
app.use("/api/users", users);
app.use("/api/products", products);

//Server listening on the specified port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
