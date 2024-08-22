import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Post from "./components/Post";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
