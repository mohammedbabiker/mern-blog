import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    console.log(files);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form className="max-w-4xl my-0 mx-auto pt-20" onSubmit={createPost}>
      <h1 className="text-3xl font-bold text-center mb-9">Create New Post</h1>
      <input
        type="text"
        placeholder="Title"
        className="block mb-3 w-full p-2 bg-transparent border border-gray-300 rounded-md"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        className="block mb-3 w-full p-2 bg-transparent border border-gray-300 rounded-md"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        className="block mb-3 w-full p-2 border border-gray-300 rounded-md"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor value={content} onChange={setContent} />

      <button className="w-full bg-gradient-to-r from-gray-300 to-gray-600 border-none rounded-md text-white px-8 py-3">
        Create Post
      </button>
    </form>
  );
}
