import express from "express";
import products from "./routes/product.js";
import users from "./routes/user.js";
import logger from "./middleware/logger.js";
import connectDB from "./config/database.js";

//Import json middleware from express
import { json } from "express";

connectDB();

// Create an instance of an Express application
const app = express();
//Define the port on which the server will listen
const port = process.env.PORT;

//Middleware to parse JSON body
app.use(json());

//Middleware to log requests
app.use(logger);

//Middleware to serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

//Set up a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Set static folder
app.use("/api/products", products);
app.use("/api/users", users);

//Server listening on the specified port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
