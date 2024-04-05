import { format } from "date-fns";

export default function Post({
  title,
  content,
  summary,
  author,
  cover,
  createdAt,
}) {
  return (
    <div className="grid grid-cols-2 gap-5 mb-4">
      <div className="">
        <img
          src={"http://localhost:4000/" + cover}
          alt="post-image"
          className="max-w-full"
        />
      </div>
      <div className="">
        <h1 className="font-bold m-0 text-xl">{title}</h1>
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
