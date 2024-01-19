// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const authRouter = require("./Routings/authRouter");
// const cors = require("cors");

import express from "express";
import mongoose from "mongoose";
import authRouter from "./Routings/authRouter.js";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

app.use(express.json());
app.use("/auth", authRouter);

app.get("/test", (req, res) => {
  res.send("api working");
});

mongoose
  .connect(
    "mongodb+srv://admin:%40dmin@cluster0.piheiiy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    server.listen(6969, () => {
      console.log("running on port 6969");
    });
  })
  .catch((err) => {
    console.log(err);
  });
