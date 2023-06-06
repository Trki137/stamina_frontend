import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "../../components/Input/Input";
import { GoogleLogin, userInputType } from "../../@types/LoginTypes";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../api/paths";
import { UserSignIn } from "../../@types/UserType";
import { validateSignIn } from "../../util/validation";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

type SignInType = {
  userSetter: Dispatch<SetStateAction<boolean>>;
};

type Error = { name: string; message: string };
export default function SignIn({ userSetter }: SignInType) {
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

  const [error, setError] = useState<Error[] | null>([]);

  const [serverError, setServerError] = useState<string | null>();

  const [user, setUser] = useState<Omit<TokenResponse, "error">>();

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const { email, family_name, given_name, name, picture } = res.data;
          const data: GoogleLogin = {
            email,
            firstname: given_name,
            lastname: family_name,
            username: name,
            image: picture,
          };

          axios
            .post(`${backend_paths.SIGN_IN_URL}/google-sign-in`, data, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            })
            .then((res) => res.data)
            .then((data) => {
              let user = null;
              if (data.user === undefined) user = data;
              else user = data.user;

              console.log(user);
              localStorage.setItem("staminaUser", JSON.stringify(user));
              userSetter(true);
              navigate(routes.HOME);
            })
            .catch((err) => setServerError(err.response.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

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
    if (!error) return null;

    const index = error.findIndex((item) => item.name === name);
    return index !== -1 ? error[index].message : null;
  };
  const handleSubmit = () => {
    setError(null);
    const user: UserSignIn = {
      username: userInput[0].value,
      password: userInput[1].value,
    };

    const errors: Error[] = validateSignIn(user);

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    axios
      .post(backend_paths.SIGN_IN_URL, user, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        let user = null;
        if (data.user === undefined) user = data;
        else user = data.user;
        console.log(data);
        if (data.image) {
          user.image = data.image;
        }
        localStorage.setItem("staminaUser", JSON.stringify(user));
        userSetter(true);
        navigate(routes.HOME);
      })
      .catch((err) => {
        console.log(err.response.data);
        setServerError(err.response.data[0].message);
      });
  };
  console.log(serverError);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {serverError && (
        <p className="mt-2 text-xs font-bold text-red-600 xs:text-lg md:text-2xl">
          {serverError}
        </p>
      )}
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
                <div className="mx-auto w-1/2 flex flex-col gap-y-1">
                  <Button text="Sign in" handleClick={handleSubmit} />
                  <Button
                    text="Sign in with "
                    icon={faGoogle}
                    handleClick={() => login()}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don't have an account?
                  <Link
                    to={routes.SIGN_UP}
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
