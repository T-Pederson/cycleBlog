import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      // redirect home
      const user = await res.json();
      localStorage.setItem("token", "Bearer " + user.token);
      navigate("/");
    } else {
      const error = await res.json();
      setError([error.msg]);
    }
  }

  return (
    <div className="w-max mx-auto mt-4">
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
        </div>
        {error && <p className="mb-4">{error}</p>}
        <button className="border border-black rounded-sm px-4 w-24 mb-4">
          Login
        </button>
      </form>
      <Link to="/" className="flex w-full justify-center underline">
        Back Home
      </Link>
    </div>
  );
}
