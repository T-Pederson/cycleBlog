export default function PostPreview({ post }) {
  return (
    <div>
      <p className="text-lg font-bold">{post.title}</p>
      <p>{post.author.username} - {new Date(post.publishedAt).toLocaleDateString()}</p>
      <p>{post.content.slice(0, 300)}...</p>
    </div>
  );
}
