import React from "react";
import { Link } from "react-router-dom";
import { backend_paths } from "../../api/backend_paths";

type ChooseTrainingButtonType = {
  id: number;
};

export default function ChooseTrainingButton({ id }: ChooseTrainingButtonType) {
  return (
    <Link
      to={`${backend_paths.WORKOUT}/${id}`}
      className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
    >
      SELECT WORKOUT
    </Link>
  );
}