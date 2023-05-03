import React from "react";

type SuccessMsgType = {
  showSuccess: boolean;
  successMsg: string | null;
};
export default function SuccessMsg({
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
              : "mt-2 mx-auto w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 opacity-0 transition-opacity ease-in-out duration-2000"
          }
        >
          {successMsg}
        </div>
      )}
    </React.Fragment>
  );
}
