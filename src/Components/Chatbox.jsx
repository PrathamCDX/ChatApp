import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Messaage from "./Messaage";

const recConext = createContext();

function Chatbox() {
  const [rec, setRec] = useState();
  useEffect(() => {
    console.log(rec);
  }, [rec]);

  return (
    <>
      <recConext.Provider value={[rec, setRec]}>
        <div className="flex flex-row w-[90vw] h-[90vh] overflow-hidden bg-orange-400 rounded-xl ">
          <Sidebar />
          <Messaage value={rec} />
        </div>
      </recConext.Provider>
    </>
  );
}

export default Chatbox;
export { recConext };
