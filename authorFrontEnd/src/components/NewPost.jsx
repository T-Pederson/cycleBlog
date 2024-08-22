import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  async function submitPost(e) {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        content: content,
        published: published,
      }),
    });

    if (res.status === 200) {
      navigate("/");
    } else {
      const errors = await res.json();
      setError(errors.msg);
    }
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
        <NavBar />
        <h1 className="font-extrabold text-2xl mx-auto">
          You must{" "}
          <Link
            to="/login"
            className="underline"
            state={{ from: location.pathname }}
          >
            login
          </Link>{" "}
          to create a post!{" "}
          <Link to="/" className="underline">
            Home
          </Link>
          .
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
      <NavBar />
      <form className="grid gap-4" onSubmit={(e) => submitPost(e)}>
        <div>
          <label htmlFor="title">Title - </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black rounded-sm max-w-48 appearance-none py-2 px-3 text-gray-700 leading-tight"
          />
        </div>
        <p className="font-semibold">
          {JSON.parse(atob(localStorage.getItem("token").split(".")[1])).user} -{" "}
          {published ? (
            <button
              className="border border-black rounded-sm w-28 px-4"
              onClick={(e) => {
                e.preventDefault();
                setPublished(false);
              }}
            >
              Published
            </button>
          ) : (
            <button
              className="border border-black rounded-sm w-32 px-4"
              onClick={(e) => {
                e.preventDefault();
                setPublished(true);
              }}
            >
              Unpublished
            </button>
          )}
        </p>
        <textarea
          name="comment"
          id="comment"
          placeholder="New Comment"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight h-96"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button className="border border-black rounded-sm px-4 w-24">
          Post!
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
