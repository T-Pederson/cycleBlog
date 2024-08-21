export default function Comment({ comment, refreshPost }) {
  async function deleteComment() {
    const res = await fetch(
      `http://localhost:3000/comment/delete/${comment.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 200) {
      refreshPost();
    } else {
      console.log("Failed to delete comment");
    }
  }

  return (
    <div className="grid gap-2 my-4">
      <div className="flex gap-4 items-baseline">
        <p>
          {comment.author.username} -{" "}
          {new Date(comment.commentedAt).toLocaleString()}
        </p>
        {localStorage.getItem("token") &&
          JSON.parse(atob(localStorage.getItem("token").split(".")[1])).sub ==
            comment.author.id && (
            <div className="flex gap-4 text-sm underline">
              <span className="hover:opacity-65 hover:cursor-pointer">
                Edit
              </span>
              <span
                className="hover:opacity-65 hover:cursor-pointer"
                onClick={deleteComment}
              >
                Delete
              </span>
            </div>
          )}
      </div>
      <p className="ml-4">{comment.content}</p>
      <hr className="border border-gray-300 my-4"></hr>
    </div>
  );
}
