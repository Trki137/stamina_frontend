import React, { ChangeEvent, useState } from "react";
import Input from "../../components/Input/Input";
import { userInputType } from "../../@types/LoginTypes";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { routes } from "../../api/paths";

export default function SignUp() {
  const [userInput, setUserInput] = useState<userInputType[]>([
    {
      name: "username",
      value: "",
      type: "text",
      label: "Username",
    },
    {
      name: "email",
      value: "",
      type: "text",
      label: "Email",
    },
    {
      name: "password",
      value: "",
      type: "password",
      label: "Password",
    },
    {
      name: "repPassword",
      value: "",
      type: "password",
      label: "Repeat Password",
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
  const handleSubmit = () => {
    console.log("Submit data...");
  };

  return (
    <div className="flex items-center w-full">
      <div className="h-auto max-w-6xl w-3/4 md:w-full mx-auto bg-white rounded-lg shadow-xl md:max-w-4xl">
        <div className="flex flex-col md:flex-row-reverse">
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
                  <div className="px-4 py-2">
                    <Input
                      inputInfo={inputInfo}
                      handleChange={handleInputChange}
                      error={getError(inputInfo.name)}
                    />
                  </div>
                ))}
                <Button text="Sign in" handleClick={handleSubmit} />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?
                  <Link
                    to={routes.signIn}
                    className="text-[#917543] hover:underline"
                  >
                    {" "}
                    Sign In.
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
