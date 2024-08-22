import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="max-w-6xl m-8 sm:mx-auto grid gap-8">
      <h1 className="font-extrabold text-2xl mx-auto">Error 404: Page Not Found</h1>
      <Link to="/" className="mx-auto self-center underline hover:opacity-65">Home</Link>
    </div>
  );
}