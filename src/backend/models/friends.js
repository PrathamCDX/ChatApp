// const mongoose = require("mongoose");
import mongoose from "mongoose";

const friendSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  list: {
    type: Array,
    required: true,
  },
});
const friendModel = mongoose.model("friendModel", friendSchema);
export default friendModel;
// module.exports
