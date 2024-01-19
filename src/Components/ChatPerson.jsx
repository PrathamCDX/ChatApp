import React, { createContext, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { recConext } from "./Chatbox";

function ChatPerson({ value }) {
  const [rec, setRec] = useContext(recConext);
  const handleClick = () => {
    setRec(value);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer bg-orange-500 hover:bg-orange-600 border-y-[1px] border-orange-900 flex justify-between px-4 items-center py-5"
      >
        {/* <img src="" alt="pfp" className="basis-1/3" /> */}

        <div> {value}</div>
        <div className="hover:scale-110 ">
          <FaTrash size={30} />
        </div>
      </div>
    </>
  );
}

export default ChatPerson;
