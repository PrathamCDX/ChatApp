import React, { createContext, useContext, useEffect, useState } from "react";
import Text from "./Text";
import SendBox from "./SendBox";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { userContext } from "../App";

const txtContext = createContext();

function Messaage({ value }) {
  const [u_name, setUsername] = useContext(userContext);
  const [texts, setTexts] = useState();
  useEffect(() => {
    console.log(texts);
  }, [texts]);

  useEffect(() => {
    if (value) {
      axios
        .post("http://localhost:6969/auth/newgetchat", {
          u_name: u_name,
          f_name: value,
        })
        .then((res) => {
          console.log(res.data);
          setTexts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  return (
    <>
      <txtContext.Provider value={[texts, setTexts]}>
        <div className="md:basis-2/3  w-full  bg-slate-400 text-wrap overflow-y-scroll flex flex-col justify-between ">
          <div className="flex items-center gap-10 border-b-2 h-[86px] px-3 py-10 sticky top-0 z-10 bg-slate-800 ">
            <IoArrowBack className="cursor-pointer aspect-square h-9 w-6" />

            <img src="" alt="PFP" />
            <div>{value}</div>
          </div>
          <div className="">
            {!value && <div className="">Start a chat</div>}
            {texts &&
              texts.map((i) => {
                return (
                  <div className="">
                    <Text value={Number(i[0])} msg_value={i.substring(1)} />
                  </div>
                );
              })}

            {/* <Text value={1} /> */}
            <SendBox value={value} />
          </div>
        </div>
      </txtContext.Provider>
    </>
  );
}

export default Messaage;
export { txtContext };
