import { useState } from "react";

export default function Comment({ comment, refreshPost }) {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [editedCommentErrors, setEditedCommentErrors] = useState([]);

  async function deleteComment() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/comment/delete/${comment.id}`,
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

  async function editComment(e) {
    e.preventDefault();

    if (comment.content === editedComment) {
      setEditMode(false);
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/comment/edit/${comment.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment: editedComment,
        }),
      }
    );

    if (res.status === 200) {
      setEditMode(false);
      setEditedCommentErrors([]);
      refreshPost();
    } else {
      const errors = await res.json();
      setEditedCommentErrors(errors.errors);
    }
  }

  return (
    <div className="grid gap-2 my-4">
      <div className="flex gap-4 items-baseline">
      <div>
          <span className="font-semibold">{comment.author.username} </span>
          <span>
            {new Date(comment.commentedAt).toLocaleString([], {
              timeStyle: "short",
            })}
          </span>
        </div>
        {localStorage.getItem("token") &&
          JSON.parse(atob(localStorage.getItem("token").split(".")[1])).sub ==
            comment.author.id && (
            <div className="flex gap-4 text-sm underline">
              <span
                className="hover:opacity-65 hover:cursor-pointer"
                onClick={() =>
                  editMode ? setEditMode(false) : setEditMode(true)
                }
              >
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
      {editMode ? (
        <form className="grid gap-4" onSubmit={(e) => editComment(e)}>
          <textarea
            name="comment"
            id="comment"
            placeholder="New Comment"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            onChange={(e) => setEditedComment(e.target.value)}
            value={editedComment}
          ></textarea>
          {editedCommentErrors.map((error, i) => (
            <p key={i}>{error.msg}</p>
          ))}
          <button className="border border-black rounded-sm px-4 w-24 mb-4">
            Done
          </button>
        </form>
      ) : (
        <p className="ml-4">{comment.content}</p>
      )}
      <hr className="border border-gray-300 my-4"></hr>
    </div>
  );
}
