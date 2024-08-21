import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state;

  async function submitLogin(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (res.status === 200) {
      const user = await res.json();
      localStorage.setItem("token", "Bearer " + user.token);
      navigate(from);
    } else {
      const error = await res.json();
      setError([error.msg]);
    }
  }

  return (
    <div className="w-max mx-auto mt-4">
      {localStorage.getItem("token") ? (
        <p>You&apos;re already logged in!</p>
      ) : (
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => submitLogin(e)}
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
          </div>
          {error && <p className="mb-4">{error}</p>}
          <button className="border border-black rounded-sm px-4 w-24 mb-4 hover:opacity-65">
            Login
          </button>
        </form>
      )}
      <p className="text-center">
        <Link to={from} className="underline hover:opacity-65">
          Cancel
        </Link>{" "}
        or{" "}
        <Link
          to={"/sign-up"}
          className="underline hover:opacity-65"
          state={{ from: from }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
