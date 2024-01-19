// const express = require("express");
// const {
//   signup,
//   login,
//   find,
//   update,
//   sendMessage,
// } = require("../controllers/authController");

import express from "express";
import {
  find,
  getchat,
  getfriends,
  getid,
  login,
  newgetchat,
  newpdatechat,
  sendMessage,
  signup,
  update,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/getid", getid);

authRouter.post("/login", login);
authRouter.post("/find", find);
authRouter.post("/update", update);
authRouter.post("/sendmessage", sendMessage);
authRouter.post("/getchat", getchat);
authRouter.post("/getfriends", getfriends);
authRouter.post("/newgetchat", newgetchat);
authRouter.post("/newupdatechat", newpdatechat);

export default authRouter;
