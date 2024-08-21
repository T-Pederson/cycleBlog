import { Link } from "react-router-dom";

export default function PostPreview({ post }) {
  return (
    <Link
      to={`posts/${post.id}`}
      className="border border-black p-2 shadow-md hover:opacity-65"
    >
      <p className="text-xl font-bold">{post.title}</p>
      <p className="font-semibold">
        {post.author.username} -{" "}
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <p>{post.content.slice(0, 300)}...</p>
    </Link>
  );
}
