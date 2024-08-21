import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Comment from "./Comment";

export default function Post() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newCommentErrors, setNewCommentErrors] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${params.postId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setPost(res.post))
      .catch((err) => console.log(err));
  }, [params.postId]);

  if (post === null) {
    return (
      <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
        <NavBar />
        <h1 className="font-extrabold text-2xl mx-auto w-max">
          Oops! Blog post not found, please return{" "}
          <Link to="/" className="underline">
            Home
          </Link>
          .
        </h1>
      </div>
    );
  }

  async function submitComment(e) {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/comment/${params.postId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        comment: newComment,
      }),
    });

    if (res.status === 200) {
      setNewComment("");
      setNewCommentErrors([]);
    } else {
      const errors = await res.json();
      setNewCommentErrors(errors.errors);
    }
  }

  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
      <NavBar />
      <div>
        <h1 className="font-extrabold text-3xl mx-auto w-max mb-4">
          {post.title}
        </h1>
        <p className="mb-4 font-semibold">
          {post.author.username} -{" "}
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <p>{post.content}</p>
        <hr className="border border-gray-500 my-8"></hr>
        <h2 className="font-bold text-lg mb-4">Comments</h2>
        {localStorage.getItem("token") ? (
          <form className="grid gap-4" onSubmit={(e) => submitComment(e)}>
            <textarea
              name="comment"
              id="comment"
              placeholder="New Comment"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            ></textarea>
            {newCommentErrors.map((error, i) => (
              <p key={i} className="mb-4">
                {error.msg}
              </p>
            ))}
            <button className="border border-black rounded-sm px-4 w-24 mb-4">
              Submit
            </button>
          </form>
        ) : (
          <p className="mb-4">
            <Link
              to="/login"
              className="underline hover:opacity-65"
              state={{ from: location.pathname }}
            >
              Login
            </Link>{" "}
            to leave a comment!
          </p>
        )}
        {post.comments &&
          post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
          ))}
      </div>
    </div>
  );
}
