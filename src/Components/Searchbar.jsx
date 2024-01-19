import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Searchres from "./Searchres";
import axios from "axios";

const Render = ({ list }) => {
  if (list) {
    console.log(list);
    list.map((item) => {
      return (
        <div key={item._id}>
          <Searchres value={item.username} />
        </div>
      );
    });
  } else {
    console.log(list);
    return <div></div>;
  }
};

function Searchbar({ value, setValue }) {
  const [search, setSearch] = useState();
  const [list, setList] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:6969/auth/find", { username: search })
      .then((res) => {
        if (search) {
          setList(Object.values(res.data));
          //   console.log(Object.values(res.data));
        } else {
          setList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 font-medium px-2">
          <IoSearchSharp size={40} />
          <input
            id="srch"
            className="my-2 bg-transparent w-[80%] outline-none border-b-[1px] h-11 text-black placeholder:text-black placeholder:font-normal"
            type="text"
            placeholder="Search"
            onChange={() => {
              setSearch(document.getElementById("srch").value);
            }}
          />
        </div>

        {list &&
          list.map((e) => {
            return (
              <div key={e._id}>
                <Searchres value={e.username} setList={setValue} />
              </div>
            );
          })}

        {/* <Render value={list} /> */}

        {/* <Searchres value={"Result"} /> */}
      </div>
    </>
  );
}

export default Searchbar;
