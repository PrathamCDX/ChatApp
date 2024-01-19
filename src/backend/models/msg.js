// const mongoose = require("mongoose");
import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
  u_name: {
    type: String,
    required: true,
  },
  f_name: {
    type: String,
    required: true,
  },
  chat1: {
    type: Array,
    required: true,
  },
  chat2: {
    type: Array,
    required: true,
  },
});
const msgModel = mongoose.model("msgModel", msgSchema);
export default msgModel;
// module.exports
