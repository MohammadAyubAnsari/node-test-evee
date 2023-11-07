const express = require("express");
const colors = require("colors");
const bodyParser = require("body-parser");
const User = require("./model/user");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/db");

const app = express();
dotenv.config();

port = process.env.port;
app.use(bodyParser.json());

// Connect to the MongoDB database
connectMongoDB();

// Define REST API endpoints

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res
    .status(201)
    .json({ success: true, message: "User created successfully", data: user });
});

// get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
});

// get a single user
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ success: true, data: user });
});

// edit user
app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, message: "User updated successfully" });
});

// delete user

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "User deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgGreen.white);
});
