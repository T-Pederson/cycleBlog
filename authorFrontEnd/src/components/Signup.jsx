import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const location = useLocation();
  const { from } = location.state || { from: "/" };

  async function submitSignup(e) {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/sign-up/author`, {
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
        <p className="mb-4">
          Thank you, {newUser.username} for creating an account!
        </p>
        <Link to="/login" className="self-center underline">
          Login with your new account!
        </Link>
      </div>
    );
  } else {
    return (
      <div className="w-max mx-auto mt-4">
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => submitSignup(e)}
        >
          <div className="flex flex-col">
            <label htmlFor="username">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48 appearance-none py-2 px-3 text-gray-700 leading-tight"
            />
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48 appearance-none py-2 px-3 text-gray-700 leading-tight"
            />
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-black rounded-sm mb-4 max-w-48 appearance-none py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          {errors.map((error, i) => (
            <p key={i} className="mb-4">
              {error.msg}
            </p>
          ))}
          <button className="border border-black rounded-sm px-4 w-24 mb-4 hover:opacity-65">
            Sign Up
          </button>
        </form>
        <Link
          to={from}
          className="flex w-full justify-center underline hover:opacity-65"
        >
          Cancel
        </Link>
      </div>
    );
  }
}
