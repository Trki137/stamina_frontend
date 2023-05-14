import React, { ChangeEvent, useState } from "react";
import ProfileButton from "../../components/Button/ProfileButton";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import SuccessMsg from "../../components/Messages/SuccessMsg";
import ErrorMessage from "../../components/Messages/ErrorMessage";

export default function FileInput() {
  const [file, setFile] = useState<null | File>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hide, setHide] = useState<boolean>(true);
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!e.target.files[0]) return;
    setFileName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (!file) {
      setErrorMsg("Please select file first");
      return;
    }
    if (!fileName) return;

    if (!(fileName.endsWith(".tcx") || fileName.endsWith(".fit"))) {
      setErrorMsg("Only .fit and .tcx files are valid.");
      return;
    }

    const user = localStorage.getItem("staminaUser");
    if (!user) return;

    const formData = new FormData();
    formData.set("file", file);
    formData.set("userId", JSON.stringify(JSON.parse(user).userid));
    const path = fileName.endsWith(".tcx") ? "file-tcx" : "file";

    axios({
      method: "post",
      url: `${backend_paths.DATA}/${path}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setFile(null);
        setFileName(null);
        setErrorMsg(null);
        setShowSuccess(true);
        setHide(false);
        setTimeout(() => setShowSuccess(false), 2000);
        setTimeout(() => setHide(true), 3500);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(fileName + " is not valid file");
      });
  };

  return (
    <div className="mx-auto w-3/4 md:w-1/2 mt-3">
      <SuccessMsg
        hide={hide}
        showSuccess={showSuccess}
        successMsg={"File uploaded successfully"}
      />
      {errorMsg && <ErrorMessage error={errorMsg} />}
      <div className=" flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>

            {!fileName && (
              <React.Fragment>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">FIT, TCX</p>
              </React.Fragment>
            )}

            {fileName && (
              <React.Fragment>
                <p className="mb-2 text-sm text-gray-500">{fileName}</p>
              </React.Fragment>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="mt-3">
        <ProfileButton text={"Save"} handleClick={handleSave} />
      </div>
    </div>
  );
}
