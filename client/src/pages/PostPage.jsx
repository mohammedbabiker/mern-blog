import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo)
    return (
      <div>
        <h1 className="text-center text-gray-400 text-lg">Loading...</h1>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold pt-3 text-center">{postInfo.title}</h1>
      <time className="text-gray-400 block text-center pt-2 text-sm">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="text-center text-sm">By @{postInfo.author.username}</div>
      <div className="py-11">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="post-cover" />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className=" p-3 leading-6"
      />
      {
        // print html from string - above
      }
    </div>
  );
}
