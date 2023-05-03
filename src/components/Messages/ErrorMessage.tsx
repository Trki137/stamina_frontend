import React from "react";

type ErrorMessageType = {
  error: null | string;
};
export default function ErrorMessage({ error }: ErrorMessageType) {
  return (
    <React.Fragment>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
          {error}
        </div>
      )}
    </React.Fragment>
  );
}