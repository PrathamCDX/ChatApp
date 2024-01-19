// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("userModel", userSchema);
export default userModel;
// module.exports = mongoose.model("userModel", userSchema);
