import { useEffect, useState } from "react";
import PostPreview from "./PostPreview";
import NavBar from "./NavBar";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts", {
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
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
      <NavBar />
      <h1 className="font-extrabold text-3xl mx-auto">
        Welcome to Cycle Blog!
      </h1>
      <p className="mx-auto self-center">
        A blog where I document my cycling journey.
      </p>
      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostPreview post={post} key={post.id} />)
        ) : (
          <p className="mx-auto self-center">No posts yet, come back soon!</p>
        )}
      </div>
    </div>
  );
}
