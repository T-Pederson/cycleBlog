import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";
import NavBar from "./NavBar";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    fetch(
      `${import.meta.env.VITE_API_URL}/posts/authorPosts/${
        JSON.parse(atob(localStorage.getItem("token").split(".")[1])).sub
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setPosts(res.posts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-4 sm:gap-8">
      <NavBar />
      <h1 className="font-extrabold text-3xl mx-auto">
        Cycle Blog Author Site
      </h1>
      <p className="mx-auto self-center">
        Authors only site to create and edit posts.
      </p>
      <a
        href={import.meta.env.VITE_USER_FRONT_END_URL}
        className="mx-auto self-center underline hover:opacity-65"
      >
        Visit the User site here!
      </a>
      <div className="grid gap-8 mt-4 sm:mt-0">
        {localStorage.getItem("token") && posts !== undefined ? (
          posts.length > 0 ? (
            posts.map((post) => <PostPreview post={post} key={post.id} />)
          ) : (
            <p className="mx-auto self-center">
              No posts yet, create your first post here!
            </p>
          )
        ) : (
          <p className="mx-auto self-center">
            <Link to="/login" className="underline hover:opacity-65">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/sign-up" className="underline hover:opacity-65">
              Sign up
            </Link>{" "}
            to create and edit your posts.
          </p>
        )}
      </div>
    </div>
  );
}
