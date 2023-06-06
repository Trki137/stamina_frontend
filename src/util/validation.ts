import { UserSignIn, UserSignUp } from "../@types/UserType";

export function validateSignUp(user: UserSignUp) {
  const passwordPattern: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]).{8,}$/;

  let errors = [];
  if (user.username === "") {
    errors.push({
      name: "username",
      message: "Username field empty",
    });
  }
  if (user.lastname === "") {
    errors.push({
      name: "lastname",
      message: "Last name field empty",
    });
  }
  if (user.firstname === "") {
    errors.push({
      name: "firstname",
      message: "First name field empty",
    });
  }

  if (user.email === "") {
    errors.push({
      name: "email",
      message: "Email field empty",
    });
  }
  if (user.password === "") {
    errors.push({
      name: "password",
      message: "Password field empty",
    });
  }
  if (user.repeatPassword === "") {
    errors.push({
      name: "repPassword",
      message: "Repeated password field empty",
    });
  }

  if (errors.length > 0) return errors;

  let emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,}$");

  if (!emailRegex.test(user.email)) {
    errors.push({
      name: "email",
      message: "Email not valid",
    });
  }

  if (user.repeatPassword !== user.password) {
    errors.push({
      name: "repPassword",
      message: "Passwords do not match",
    });
  }

  if (!passwordPattern.test(user.password)) {
    errors.push({
      name: "password",
      message:
        "Password must contain at least 8 characters, with one upper and lower case and special sign and digit",
    });
  }

  return errors;
}

export function validateSignIn(user: UserSignIn) {
  let errors = [];
  if (user.username === "") {
    errors.push({
      name: "username",
      message: "Username field empty",
    });
  }

  if (user.password === "") {
    errors.push({
      name: "password",
      message: "Password field empty",
    });
  }

  return errors;
}
