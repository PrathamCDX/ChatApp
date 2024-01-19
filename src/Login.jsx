import React, { useContext, useState, useEffect } from "react";
import { regContext, permitContext, userContext } from "./App";
import axios from "axios";

function Login() {
  const changeUser = async (value) => {
    const data = await setUsername(value);
    console.log(data);
  };

  const [u_name, setUsername] = useContext(userContext);
  const [permit, setPermit] = useContext(permitContext);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/auth/login", {
        username: info.username,
        password: info.password,
      })
      .then((res) => {
        if (res.data === "1" || res.data === 1) {
          console.log("Entered");
          var u_n = info.username;
          setUsername(info.username);
          setPermit(1);
        } else {
          alert("wrong username or password");
        }

        // console.log(info.username);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [reg, setReg] = useContext(regContext);

  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const input_class =
    "m-2 text-slate-950 border-none bg-transparent outline-none outline-b-2";
  return (
    <>
      <div className="bg-[rgba(255,255,251,0.2)] backdrop-blur-sm text-slate-950 flex-row items-center justify-center py-4 w-80 rounded-3xl ">
        <div className="text-[#000000] opacity-100 text-xl font-bold mt-2">
          Login
        </div>
        <form className=" p-1 my-3" action="">
          <input
            className={input_class}
            type="text"
            placeholder="Username"
            name=""
            id="username"
            onChange={() => {
              setInfo({
                ...info,
                username: document.getElementById("username").value,
              });
            }}
          />
          <input
            type="password"
            size={20}
            className={input_class}
            placeholder="Password"
            id="password"
            onChange={() => {
              setInfo({
                ...info,
                password: document.getElementById("password").value,
              });
            }}
          />
          <div className="flex justify-center items-center gap-9">
            <button className="font-bold text-white " onClick={handleClick}>
              Submit
            </button>
            <div
              className="cursor-pointer font-semibold pt-5 underline"
              onClick={() => {
                setReg(!reg);
              }}
            >
              Register?
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
