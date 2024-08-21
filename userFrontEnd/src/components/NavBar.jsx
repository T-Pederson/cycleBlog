import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    navigate(location.pathname);
  }

  return (
    <nav className="flex justify-between text-nowrap">
      <Link to="/" className="font-bold hover:opacity-65">
        Cycle Blog
      </Link>
      {localStorage.getItem("token") ? (
        <div className="flex gap-4 sm:gap-8 text-nowrap">
          <span>
            Hi,{" "}
            {JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user}
          </span>
          <Link to="/" className="hover:opacity-65">
            Home
          </Link>
          <button onClick={logout} className="hover:opacity-65">
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex gap-8">
          <Link to="/" className="hover:opacity-65">
            Home
          </Link>
          <Link
            to="/login"
            className="hover:opacity-65"
            state={{ from: location.pathname }}
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="hover:opacity-65"
            state={{ from: location.pathname }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
