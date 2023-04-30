import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type AddDataModalType = {
  children: React.ReactNode;
  title: string;
  modalChange: () => void;
};

export default function AddDataModal({
  children,
  title,
  modalChange,
}: AddDataModalType) {
  return (
    <div
      id="defaultModal"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center"
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow-xl py-3">
          <div className="flex justify-between items-center p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 mx-auto">
              {title}
            </h3>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={modalChange}
              className="cursor-pointer"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
