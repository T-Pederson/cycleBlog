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
      {localStorage.getItem("token") ? (
        <div className="flex flex-col sm:flex-row gap-4 mx-auto sm:w-full sm:justify-between items-center">
          <div className="flex gap-4 sm:gap-8 text-nowrap">
            <Link to="/" className="font-bold hover:opacity-65">
              Cycle Blog
            </Link>
            <span>
              Hi,{" "}
              {
                JSON.parse(atob(localStorage.getItem("token").split(".")[1]))
                  .user
              }
            </span>
          </div>
          <div className="flex gap-4 sm:gap-8 text-nowrap justify-center">
            <Link to="/" className="font-semibold hover:opacity-65">
              Home
            </Link>
            <Link to="/new-post" className="font-semibold hover:opacity-65">
              New Post
            </Link>
            <button onClick={logout} className="font-semibold hover:opacity-65">
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 mx-auto sm:w-full sm:justify-between items-center">
          <div className="flex gap-4 sm:gap-8 text-nowrap">
            <Link to="/" className="font-bold hover:opacity-65">
              Cycle Blog
            </Link>
          </div>
          <div className="flex gap-4 sm:gap-8 text-nowrap justify-center">
            <Link to="/" className="font-semibold hover:opacity-65">
              Home
            </Link>
            <Link
              to="/login"
              className="font-semibold hover:opacity-65"
              state={{ from: location.pathname }}
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="font-semibold hover:opacity-65"
              state={{ from: location.pathname }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
