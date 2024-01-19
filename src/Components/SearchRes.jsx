import axios from "axios";
import React, { useContext } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { userContext } from "../App";

function Searchres({ value, setList }) {
  const [u_name, setUsername] = useContext(userContext);

  const handleClick = () => {
    axios
      .post("http://localhost:6969/auth/update", {
        username: u_name,
        f_name: value,
      })
      .then((res) => {
        setList(Object.values(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer bg-orange-400 border-y-[1px] border-orange-900 flex justify-between items-center p-3"
      >
        <div> {value}</div>
        <div>
          <IoPersonAdd />
        </div>
      </div>
    </>
  );
}

export default Searchres;
