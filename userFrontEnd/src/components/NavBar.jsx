import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex justify-between">
      <Link to="/">Cycle Blog</Link>
      <div className="flex gap-8">
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </nav>
  );
}
