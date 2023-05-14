import React from "react";

import { Link } from "react-router-dom";

import { routes } from "../../api/paths";

export default function PageNotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you have found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <Link to={routes.HOME}>
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + "images/NotFoundedImage2.png"}
              alt="missing"
            />
          </div>
        </div>
      </div>
      <div>
        <img
          src={process.env.PUBLIC_URL + "images/NotFoundedImage1.png"}
          alt="missing"
        />
      </div>
    </div>
  );
}
