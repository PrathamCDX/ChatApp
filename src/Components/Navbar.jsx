import React, { useContext } from "react";
import { permitContext, userContext } from "../App";

function Navbar() {
  const [u_name, setUsername] = useContext(userContext);
  const [permit, setPermit] = useContext(permitContext);
  return (
    <>
      <div className=" sticky top-0 bg-orange-600 px-4 flex justify-between items-center p-3 text-lg border-b-2 pb-2 ">
        <div>Chatttt</div>
        <div className="flex-col justify-center gap-3">
          <div>{u_name}</div>
          <div
            className="rounded-lg bg-orange-900 my-2 text-white p-1 px-2 cursor-pointer"
            onClick={() => {
              setPermit(0);
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
