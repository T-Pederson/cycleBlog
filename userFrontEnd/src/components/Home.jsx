import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import NavBar from "./NavBar";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setPosts(res.posts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-4 sm:gap-8">
      <NavBar />
      <h1 className="font-extrabold text-3xl mx-auto">
        Welcome to Cycle Blog!
      </h1>
      <p className="mx-auto self-center">
        A blog where I document my cycling journey.
      </p>
      <a
        href={import.meta.env.VITE_AUTHOR_FRONT_END_URL}
        className="mx-auto self-center underline hover:opacity-65"
      >
        Visit the Author site here!
      </a>
      <div className="grid gap-8 mt-4 sm:mt-0">
        {posts.length > 0 ? (
          posts.map((post) => <PostPreview post={post} key={post.id} />)
        ) : (
          <p className="mx-auto self-center">No posts yet, come back soon!</p>
        )}
      </div>
    </div>
  );
}
