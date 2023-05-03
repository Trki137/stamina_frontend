import React from "react";

type SuccessMsgType = {
  hide: boolean;
  showSuccess: boolean;
  successMsg: string | null;
};
export default function SuccessMsg({
  hide,
  showSuccess,
  successMsg,
}: SuccessMsgType) {
  return (
    <React.Fragment>
      {successMsg && (
        <div
          className={
            showSuccess
              ? "mt-2 mx-auto w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 opacity-100"
              : hide
              ? "hidden"
              : "mt-2 mx-auto w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 opacity-0 transition-opacity ease-in-out duration-1000"
          }
        >
          {successMsg}
        </div>
      )}
    </React.Fragment>
  );
}
