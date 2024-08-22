import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Comment from "./Comment";

export default function Post() {
  const params = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newCommentErrors, setNewCommentErrors] = useState([]);
  const [editPostMode, setEditPostMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/${params.postId}/author`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res.post);
        setEditedPost({
          title: res.post.title,
          content: res.post.content,
          published: res.post.published,
        });
      })
      .catch((err) => console.log(err));
  }, [params.postId]);

  function refreshPost() {
    fetch(`${import.meta.env.VITE_API_URL}/posts/${params.postId}/author`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setPost(res.post))
      .catch((err) => console.log(err));
  }

  async function submitComment(e) {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/comment/${params.postId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      }
    );

    if (res.status === 200) {
      setNewComment("");
      setNewCommentErrors([]);
      refreshPost();
    } else {
      const errors = await res.json();
      setNewCommentErrors(errors.errors);
    }
  }

  async function editPost(e) {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/edit/${post.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: editedPost.title,
          content: editedPost.content,
          published: editedPost.published,
        }),
      }
    );

    if (res.status === 200) {
      setEditPostMode(false);
      refreshPost();
    } else {
      const errors = await res.json();
      console.log(errors);
    }
  }

  if (post === null) {
    return (
      <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
        <NavBar />
        <h1 className="font-extrabold text-2xl mx-auto">
          Oops! Blog post not found, please return{" "}
          <Link to="/" className="underline">
            Home
          </Link>
          .
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl m-4 sm:mx-auto grid gap-8">
      <NavBar />
      <div>
        {editPostMode ? (
          <div>
            <form className="grid gap-4" onSubmit={(e) => editPost(e)}>
              <div>
                <label htmlFor="title">Title - </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                  }
                  className="border border-black rounded-sm max-w-48 appearance-none py-2 px-3 text-gray-700 leading-tight"
                />
              </div>
              <p className="font-semibold">
                {post.author.username} -{" "}
                {editedPost.published ? (
                  <button
                    className="border border-black rounded-sm w-28 px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditedPost({ ...editedPost, published: false });
                    }}
                  >
                    Published
                  </button>
                ) : (
                  <button
                    className="border border-black rounded-sm w-32 px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditedPost({ ...editedPost, published: true });
                    }}
                  >
                    Unpublished
                  </button>
                )}
              </p>
              <textarea
                name="comment"
                id="comment"
                placeholder="New Comment"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight h-96"
                onChange={(e) =>
                  setEditedPost({ ...editedPost, content: e.target.value })
                }
                value={editedPost.content}
              ></textarea>
              <button
                className="border border-black rounded-sm px-4 w-24 mb-4"
                onClick={editPost}
              >
                Done
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="font-extrabold text-3xl mx-auto mb-4">
              {post.title}
            </h1>
            <p className="mb-4 font-semibold">
              {post.author.username} -{" "}
              {post.published
                ? new Date(post.publishedAt).toLocaleDateString()
                : "Unpublished"}
            </p>
            <p className="mb-4">{post.content}</p>
            <button
              className="border border-black rounded-sm px-4 w-24"
              onClick={() => setEditPostMode(true)}
            >
              Edit Post
            </button>
          </div>
        )}
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
            or{" "}
            <Link
              to="/sign-up"
              className="underline hover:opacity-65"
              state={{ from: location.pathname }}
            >
              Sign Up
            </Link>{" "}
            to leave a comment!
          </p>
        )}
        {post.comments &&
          post.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              authorId={post.author.id}
              refreshPost={refreshPost}
            ></Comment>
          ))}
      </div>
    </div>
  );
}
