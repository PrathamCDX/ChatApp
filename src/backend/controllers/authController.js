// const userModel = require("../models/user");
// const friendModel = require("../models/friends");
// const msgModel = require("../models/msg");

import userModel from "../models/user.js";
import friendModel from "../models/friends.js";
import msgModel from "../models/msg.js";

async function sendMessage(req, res) {
  try {
    const { u_name, f_name, chat } = req.body;
    const data = await msgModel.findOne({
      $and: [{ u_name: u_name }, { f_name: f_name }],
    });

    const d2 = await msgModel.findOne({
      $and: [{ u_name: f_name }, { f_name: u_name }],
    });

    let arr = [];
    if (data) {
      arr = data.chat;
      let arr2 = d2.chat;
      arr.push("1" + chat);

      let new_data = await msgModel.updateOne(
        {
          $and: [{ u_name: u_name }, { f_name: f_name }],
        },
        {
          u_name: u_name,
          f_name: f_name,
          chat: arr,
        }
      );

      arr.pop();
      arr2.push("0" + chat);
      let nd2 = await msgModel.updateOne(
        {
          $and: [{ u_name: f_name }, { f_name: u_name }],
        },
        {
          u_name: f_name,
          f_name: u_name,
          chat: arr2,
        }
      );
      console.log(nd2);
      return res.status(201).send(new_data);
    }
    arr.push("1" + chat);

    let new_data = await msgModel.create({
      u_name: u_name,
      f_name: f_name,
      chat: arr,
    });

    arr.pop();
    arr.push("0" + chat);
    let nd2 = await msgModel.create({
      u_name: f_name,
      f_name: u_name,
      chat: arr,
    });
    console.log(nd2);
    return res.status(200).send(new_data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

const update = async (req, res) => {
  try {
    const { username, f_name } = req.body;

    const user = await friendModel.findOne({ username: username });
    const user2 = await friendModel.findOne({ username: f_name });

    if (user == null || user2 == null) {
      return res.status(300);
    }

    const a1 = user.list;
    const a2 = user2.list;

    a1.push(f_name);
    a2.push(username);

    // console.log(a1);
    // console.log(a2);

    const new_user = await friendModel.updateOne(
      { username: username },
      { list: a1 }
    );

    const new_user2 = await friendModel.updateOne(
      { username: f_name },
      { list: a2 }
    );

    // console.log(a2);
    // return res.status(200);
    return res.status(200).send(a1);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const signup = async (req, res) => {
  // console.log(typeof req.body.username);
  // return res.send(req.body);
  try {
    // const { username, password } = req.body;
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);

    const prevUser = await userModel.findOne({ username: username });
    if (prevUser) {
      return res.status(200).send("0");
    }
    const new_user = await userModel.create({
      username: username,
      password: password,
    });

    const user = await friendModel.create({
      username: new_user.username,
      list: [],
    });
    console.log(user);
    res.send("1");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing_user = await userModel.findOne({ username: username });

    if (!existing_user) {
      console.log("User not found");
      return res.send("0");
    }
    //   console.log(typeof existing_user.id.toString());

    if (existing_user.password === password) {
      console.log("Password matched");
      return res.status(200).send("1");
    }

    return res.status(200).send("0");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
const find = async (req, res) => {
  const { username } = req.body;
  try {
    const users = await userModel.find({
      username: { $regex: new RegExp(username, "i") },
    });

    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getfriends = async (req, res) => {
  try {
    const username = req.body.username;
    const users = await friendModel.find({ username: username });
    // console.log(users);
    // console.log(users.list);
    res.send(users[0].list);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getchat = async (req, res) => {
  try {
    // return res.send(req.body);
    const u_name = req.body.u_name;
    const f_name = req.body.f_name;

    const data = await msgModel.findOne({
      $and: [{ u_name: u_name }, { f_name: f_name }],
    });

    if (!data) {
      const new_data = await msgModel.create({
        u_name: u_name,
        f_name: f_name,
        chat: [],
      });

      // console.log(new_data);
      return res.send(new_data);
    }

    return res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const newpdatechat = async (req, res) => {
  try {
    const { u_name, f_name, msg } = req.body;
    const data1 = await msgModel.findOne({
      $and: [{ u_name: u_name }, { f_name: f_name }],
    });

    const data2 = await msgModel.findOne({
      $and: [{ u_name: f_name }, { f_name: u_name }],
    });

    if (data1) {
      const a1 = data1.chat1;
      const a2 = data1.chat2;

      a1.push("1" + msg);
      a2.push("0" + msg);

      const new_data1 = await msgModel.updateOne(
        {
          $and: [{ u_name: u_name }, { f_name: f_name }],
        },
        {
          u_name: u_name,
          f_name: f_name,
          chat1: a1,
          chat2: a2,
        }
      );

      return res.send(a1);
    }

    if (data2) {
      const a1 = data2.chat1;
      const a2 = data2.chat2;

      a1.push("0" + msg);
      a2.push("1" + msg);
      const new_data2 = await msgModel.updateOne(
        {
          $and: [{ u_name: f_name }, { f_name: u_name }],
        },
        {
          u_name: f_name,
          f_name: u_name,
          chat1: a1,
          chat2: a2,
        }
      );
      // console.log(data2);
      return res.send(a2);
    }

    return res.send(new_data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const newgetchat = async (req, res) => {
  try {
    const { u_name, f_name } = req.body;

    const data1 = await msgModel.findOne({
      $and: [{ u_name: u_name }, { f_name: f_name }],
    });

    const data2 = await msgModel.findOne({
      $and: [{ u_name: f_name }, { f_name: u_name }],
    });

    if (data1) {
      return res.send(data1.chat1);
    }

    if (data2) {
      return res.send(data2.chat2);
    }

    const new_data = await msgModel.create({
      u_name: u_name,
      f_name: f_name,
      chat1: [],
      chat2: [],
    });

    return res.send(new_data.chat1);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getid = async (req, res) => {
  try {
    const { u_name, f_name } = req.body;
    const data1 = await msgModel.findOne({
      $and: [{ u_name: u_name }, { f_name: f_name }],
    });

    const data2 = await msgModel.findOne({
      $and: [{ u_name: f_name }, { f_name: u_name }],
    });

    if (data1) {
      return res.send(data1);
    }

    if (data2) {
      return res.send(data2);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export {
  getid,
  newpdatechat,
  newgetchat,
  getchat,
  signup,
  login,
  find,
  update,
  sendMessage,
  getfriends,
};
