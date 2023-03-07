import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../components/Input/Input";

export default function Registration() {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submit data...");
  };

  console.log("Sign up page");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={username}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          label="Username"
        />
      </form>
    </div>
  );
}
