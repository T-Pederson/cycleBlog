import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const user = await res.json();
    localStorage.setItem("token", "Bearer " + user.token)
  }

  return (
    <div>
      <form
        className="grid grid-cols-2 max-w-fit"
        onSubmit={(e) => submitLogin(e)}
      >
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-black rounded-lg"
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black rounded-lg"
        />
        <button className="border border-black col-span-2 place-self-center px-4">
          Log In
        </button>
      </form>
    </div>
  );
}
