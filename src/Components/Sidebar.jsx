import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import ChatPerson from "./ChatPerson";
import Searchbar from "./Searchbar";
import axios from "axios";
import { userContext } from "../App";
function Sidebar() {
  const [u_name, setUsername] = useContext(userContext);
  const [list, setList] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:6969/auth/getfriends", { username: u_name })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [list]);
  return (
    <>
      <div className="md:basis-1/3 hidden md:block overflow-y-scroll">
        <Navbar />
        <Searchbar value={list} setValue={setList} />
        {data.map((i) => {
          return (
            <div>
              <ChatPerson value={i} />
            </div>
          );
        })}
        <ChatPerson value={"Info"} />
      </div>
    </>
  );
}

export default Sidebar;
