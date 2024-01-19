import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Chatbox from "./Components/Chatbox";
import axios from "axios";

const regContext = createContext();
const permitContext = createContext();
const userContext = createContext();

function App() {
  const [reg, setReg] = useState(1);
  const [permit, setPermit] = useState(0);
  const [u_name, setUsername] = useState("user7");

  // useEffect(() => {
  //    setUsername("hello");
  //   console.log("username  ", username);
  //   console;
  // }, [permit]);

  return (
    <>
      <permitContext.Provider value={[permit, setPermit]}>
        <userContext.Provider value={[u_name, setUsername]}>
          <regContext.Provider value={[reg, setReg]}>
            <div>
              {permit ? <Chatbox /> : reg ? <Register /> : <Login />}

              {/* {reg ? <Register /> : <Login />} */}
              {/* <Chatbox /> */}
              {/* <Register /> */}
            </div>
          </regContext.Provider>
        </userContext.Provider>
      </permitContext.Provider>
    </>
  );
}

export default App;
export { regContext, permitContext, userContext };
