import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import "./ProfileImageUpload.css";

type ProfileImageUploadType = {
  file: null | string;
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ProfileImageUpload({
  file,
  handleFileInput,
}: ProfileImageUploadType) {
  console.log(file);
  return (
    <div className="absolute file-input-container">
      <input
        type="file"
        onChange={handleFileInput}
        name="file"
        id="file"
        className="input-file"
      />
      <label htmlFor="file" className="file-label">
        {!file && (
          <FontAwesomeIcon icon={faUserCircle} className="icon-user-circle" />
        )}
        <FontAwesomeIcon icon={faUpload} className="icon-file-upload" />

        {file && (
          <img src={file} alt="Something went wrong" className="image-user" />
        )}
      </label>
    </div>
  );
}
