import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }

    const response = await fetch("http://localhost:4000/post/", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <form className="max-w-4xl my-0 mx-auto pt-20" onSubmit={updatePost}>
      <h1 className="text-3xl font-bold text-center mb-9">Edit Post</h1>
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
        className="block mb-3 w-full p-2 bg-transparent border border-gray-300 rounded-md"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button className="block mb-3 w-full p-2 bg-transparent border border-gray-300 rounded-md">
        Update Post
      </button>
    </form>
  );
}
