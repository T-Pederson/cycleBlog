import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitSignup(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/sign-up", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    const msg = await res.json();

    console.log(msg);
  }

  return (
    <div>
      <form
        className="grid grid-cols-2 max-w-fit"
        onSubmit={(e) => submitSignup(e)}
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
        <label htmlFor="confirmPassword">Confirm Password </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-black rounded-lg"
        />
        <button className="border border-black col-span-2 place-self-center px-4">
          Sign Up
        </button>
      </form>
    </div>
  );
}
