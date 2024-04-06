import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  title,
  content,
  summary,
  author,
  cover,
  createdAt,
  _id,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4 pt-14 pb-2 border-b-[1px] border-b-gray-200 dark:border-stone-600">
      <div className="">
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            alt="post-image"
            className="max-w-full"
          />
        </Link>
      </div>
      <div className="col-span-2">
        <Link to={`/post/${_id}`}>
          <h1 className="font-bold m-0 text-xl">{title}</h1>
        </Link>
        <p className="text-sm my-[6px] mx-0 flex gap-3">
          <a href="#" className="text-gray-500">
            {author.username}
          </a>
          <time className="text-gray-500">
            {format(new Date(createdAt), "MMMM d, yyyy HH:mm")}
          </time>
        </p>
        <p className="my-2 mx-0 leading-5">{summary}</p>
      </div>
    </div>
  );
}
