import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
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
        <h1 className="text-center text-gray-400 text-lg pt-9">Loading...</h1>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold pt-3 text-center">{postInfo.title}</h1>
      <time className="text-gray-400 block text-center pt-2 text-sm">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="text-center text-sm">By @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="text-center mt-3">
          <Link
            to={`/edit/${postInfo._id}`}
            className="text-center items-center inline-flex gap-1 text-sm bg-gray-700 text-white px-3 py-2 rounded-[5px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </Link>
        </div>
      )}
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
