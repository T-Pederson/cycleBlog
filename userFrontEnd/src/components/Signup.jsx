import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [newUser, setNewUser] = useState(null);

  async function submitSignup(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    if (res.status === 200) {
      const user = await res.json();
      setNewUser(user);
    } else {
      const errors = await res.json();
      setErrors(errors.errors);
    }
  }

  if (newUser) {
    return (
      <div className="w-max mx-auto mt-4 flex flex-col items-center">
        <p className="mb-4">Thank you, {newUser.username} for creating an account!</p>
        <Link to="/" className="self-center underline">
          Back Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className="w-max mx-auto mt-4">
        <form className="flex flex-col items-center" onSubmit={(e) => submitSignup(e)}>
          <div className="flex flex-col">
            <label htmlFor="username">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48"
            />
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48"
            />
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48"
            />
          </div>
          {errors.map((error, i) => (
            <p key={i} className="mb-4">
              {error.msg}
            </p>
          ))}
          <button className="border border-black rounded-sm px-4 w-24 mb-4">
            Sign Up
          </button>
        </form>
        <Link to="/" className="flex w-full justify-center underline">
          Back Home
        </Link>
      </div>
    );
  }
}
