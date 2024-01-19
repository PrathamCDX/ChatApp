import React, { useContext, useEffect, useState } from "react";
import { regContext, permitContext, userContext } from "./App";
import axios from "axios";

function Register() {
  const [u_name, setUsername] = useContext(userContext);
  const [permit, setPermit] = useContext(permitContext);

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/auth/signup", {
        username: info.username,
        password: info.password,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data === "1" || res.data === 1) {
          console.log("enterd");
          setPermit(1);
          setUsername(info.username);
          // setUser(info.username);
          // console.log(user);
        }
      })
      .catch((err) => console.log(err));
  };

  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [reg, setReg] = useContext(regContext);
  const [password2, setPassword2] = useState("");
  const [passError, setpassError] = useState(0);
  useEffect(() => {
    if (info.password === password2) {
      setpassError(0);
    } else {
      setpassError(1);
    }
  }, [password2]);

  const input_class =
    "m-2 text-slate-950 border-none bg-transparent outline-none outline-b-2";

  return (
    <>
      <div className="bg-[rgba(255,255,251,0.2)] backdrop-blur-sm text-slate-950 flex-row items-center justify-center py-4 w-80 rounded-3xl ">
        <div className="font-bold text-xl pb-3 ">Register</div>

        <form action="">
          {/* USERNAME */}
          <input
            className={input_class}
            id="username"
            onChange={() => {
              setInfo({
                ...info,
                username: document.getElementById("username").value,
              });
            }}
            type="text"
            placeholder="Username"
          />

          {/* PHONE NUMBER */}
          {/* <input
            className={input_class}
            onChange={() => {
              setInfo({
                ...info,
                phone: document.getElementById("phone").value,
              });
            }}
            id="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]"
            placeholder="Ph Number"
          /> */}

          {/* EMAIL
          <input
            className={input_class}
            onChange={() => {
              setInfo({
                ...info,
                email: document.getElementById("email").value,
              });
            }}
            type="email"
            id="email"
            placeholder="Email"
          /> */}

          {/* MAIN PASS */}
          <input
            className={input_class}
            onChange={() => {
              setInfo({
                ...info,
                password: document.getElementById("main_pass").value,
              });
            }}
            type="password"
            placeholder="Password"
            id="main_pass"
          />

          {/* CHECK PASS */}
          <input
            className={input_class}
            type="password"
            placeholder="Re-enter password"
            name=""
            id="check_pass"
            onChange={() => {
              setPassword2(document.getElementById("check_pass").value);
            }}
          />
        </form>

        <div>
          {passError ? (
            <div className="font-bold text-red-600">Wrong password</div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex justify-center items-center gap-9">
          <button
            className={
              !passError
                ? "font-bold text-red block"
                : "font-bold text-white hidden"
            }
            onClick={handleClick}
          >
            Submit
          </button>
          <div
            className="cursor-pointer font-semibold py-5 underline"
            onClick={() => {
              setReg(!reg);
            }}
          >
            Login?
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
