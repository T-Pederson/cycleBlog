import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="flex justify-between">
      <Link to="/" className="font-bold">
        Cycle Blog
      </Link>
      {localStorage.getItem("token") ? (
        <div className="flex gap-8">
          <span>
            Welcome,{" "}
            {JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user}
          </span>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div className="flex gap-8">
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
