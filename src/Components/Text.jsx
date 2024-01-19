import React from "react";

function Text({ value, msg_value }) {
  return (
    <>
      <div className="text-messages m-3 rounded-3xl overflow-hidden">
        {/* App.css */}
        {!value ? (
          <p className="p-2 px-4 relative float-left rounded-3xl max-w-[60vw] md:max-w-[40vw] bg-slate-700">
            {msg_value}
          </p>
        ) : (
          <p className="p-2 px-4 max-w-[60vw] md:max-w-[40vw] rounded-3xl bg-slate-500 relative float-right">
            {msg_value}
          </p>
        )}
      </div>
    </>
  );
}

export default Text;
