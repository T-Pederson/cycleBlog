import NavBar from "./NavBar";

export default function Home() {
  async function getPosts() {
    if (localStorage.getItem("token")) {
      const res = await fetch("http://localhost:3000/posts", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
      });
  
      const posts = await res.json();
  
      console.log(posts);
    }
  };

  getPosts();

  return (
    <div className="mx-auto max-w-5xl ">
      <NavBar />
      <h1>Welcome to Cycle Blog!</h1>
    </div>
  );
}
