import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

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
    <form className="max-w-md my-0 mx-auto" onSubmit={createPost}>
      <input
        type="text"
        placeholder="Title"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        className="block mb-3 w-full py-1 px-3 border border-gray-300 rounded-md"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <ReactQuill
        className="mb-3"
        value={content}
        modules={modules}
        onChange={(newValue) => setContent(newValue)}
      />
      <button className="w-full bg-gray-500 border-none rounded-md text-white p-1">
        Create Post
      </button>
    </form>
  );
}
//  className="mb-3"
// theme="snow"
// placeholder="Content"
// modules={{ toolbar: [["bold", "italic", "underline"]] }}
