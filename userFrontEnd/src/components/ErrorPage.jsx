import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Error 404: Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}