export default function Comment({ comment }) {
  return (
    <div>
      <p className="mb-4">
        {comment.author.username} -{" "}
        {new Date(comment.commentedAt).toLocaleString()}
      </p>
      <p>{comment.content}</p>
      <hr className="border border-gray-300 my-4"></hr>
    </div>
  );
}
