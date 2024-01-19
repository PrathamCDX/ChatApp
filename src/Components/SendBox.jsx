import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { recConext } from "./Chatbox";
import io from "socket.io-client";
import { txtContext } from "./Messaage";

const socket = io.connect("http://localhost:6969");

function SendBox({ value }) {
  const [u_name, setUsername] = useContext(userContext);
  const [rec, setRec] = useContext(recConext);
  const [texts, setTexts] = useContext(txtContext);
  const [messageReceived, setMessageReceived] = useState("");
  const [id, setId] = useState("");
  const [text, setText] = useState();
  const [t2, setT2] = useState();

  useEffect(() => {
    console.log(texts);
  }, []);

  const joinRoom = (rm) => {
    console.log("joined", rm);
    if (rm !== "") {
      socket.emit("join_room", rm);
    }
  };

  const sendMessage = (x) => {
    console.log("sendMessage ", x);
    socket.emit("send_message", { x, room: id });
  };

  useEffect(() => {
    axios
      .post("http://localhost:6969/auth/getid", {
        u_name: u_name,
        f_name: value,
      })
      .then((res) => {
        // console.log(typeof res.data._id);
        joinRoom(res.data._id);
        setId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  useEffect(() => {
    setT2(text);
  }, [text]);

  const handleClick = (e) => {
    if (text) {
      let a1 = texts;
      console.log(a1);
      if (a1) {
        a1.push("1" + t2);
        setTexts(a1);
      } else {
        setTexts(["1" + t2]);
      }

      sendMessage(t2);
      axios
        .post("http://localhost:6969/auth/newupdatechat", {
          u_name: u_name,
          f_name: rec,
          msg: t2,
        })
        .then((res) => {
          // console.log(t2);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // setText("");
      // document.getElementById("message").innerHTML = "";
      // document.getElementById("message").value = "";
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageReceived(data.message);
      let a1 = texts;
      if (a1) {
        a1.push("0" + data.message);
        setTexts(a1);
      } else {
        setTexts["0" + data.message];
      }
    });
  }, [socket]);
  return (
    <div className="bg-white sticky bottom-0 py-3 flex justify-between px-5">
      <input
        className="bg-transparent outline-none border-none text-black w-[80%] "
        type="text"
        placeholder="Message"
        id="meassage"
        onChange={(e) => {
          console.log(e.target.value);
          setText(e.target.value);
        }}
      />
      <button onClick={handleClick} className="px-2 py-1 ">
        Send
      </button>
    </div>
  );
}

export default SendBox;
