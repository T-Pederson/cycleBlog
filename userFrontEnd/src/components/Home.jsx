import PostPreview from "./PostPreview";
import NavBar from "./NavBar";

export default function Home({ posts }) {
  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
      <NavBar />
      <h1 className="font-extrabold text-3xl mx-auto">
        Welcome to Cycle Blog!
      </h1>
      <p className="mx-auto self-center">A site where I blog about my cycling journey, starting as a complete beginner.</p>
      <div className="grid gap-8">
        {posts.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
