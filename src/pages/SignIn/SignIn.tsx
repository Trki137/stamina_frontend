import React, { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";
import { userInputType } from "../../@types/LoginTypes";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { routes } from "../../api/paths";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignIn() {
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "username",
      value: "",
      type: "text",
      label: "Username",
    },
    {
      name: "password",
      value: "",
      type: "password",
      label: "Password",
    },
  ]);

  const [error, setError] = useState<{ name: string; value: string }[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInput((prevUserInput) => {
      const newUserInput = [...prevUserInput];
      const index = newUserInput.findIndex((item) => item.name === name);
      newUserInput[index].value = value;
      return newUserInput;
    });
  };

  const getError = (name: string) => {
    const index = error.findIndex((item) => item.name === name);
    return index !== -1 ? error[index].value : null;
  };
  const handleSubmit = () => {};

  return (
    <div className="flex items-center w-full">
      <div className="h-auto max-w-6xl w-3/4 md:w-full mx-auto bg-white rounded-lg shadow-xl md:max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src={process.env.PUBLIC_URL + "/images/LoginImage.jpg"}
              alt="Something went wrong"
            />
          </div>
          <div className="flex h-full w-full items-center align-middle justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full h-full">
              <div className="flex justify-center"></div>
              <div>
                {userInput.map((inputInfo) => (
                  <div key={inputInfo.name} className="px-4 py-2">
                    <Input
                      inputInfo={inputInfo}
                      handleChange={handleInputChange}
                      error={getError(inputInfo.name)}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-y-1">
                  <Button text="Sign in" handleClick={handleSubmit} />
                  <Button
                    text="Sign in with"
                    icon={faGoogle}
                    handleClick={handleSubmit}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don't have an account?
                  <Link
                    to={routes.signUp}
                    className="text-[#917543] hover:underline"
                  >
                    {" "}
                    Sign Up.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
