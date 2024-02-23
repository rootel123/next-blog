import { Post } from "contentlayer/generated";
import { FC } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <li>
      <Link
        href={post.url}
        className="flex border-2 border-black w-[700px] p-2 rounded-md shadow-2xl shadow-gray-400 hover:scale-110 transition-transform duration-300"
      >
        <div>
          <Image
            src={`/images/${post.thumbnail ? post.thumbnail : "nice.png"}`}
            alt={post.title}
            width={128}
            height={128}
            className="rounded-xl border-2 border-gray-400"
          />
        </div>
        <div className="ml-2 flex flex-col gap-4 mt-1">
          <h2 className="text-xl font-extrabold">{post.title}</h2>
          <div className="w-[540px] truncate">{post.description}</div>
          <time dateTime={post.date} className="mt-4 text-sm text-right">
            {format(parseISO(post.date), "yyyy년 M월 d일")}
          </time>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
