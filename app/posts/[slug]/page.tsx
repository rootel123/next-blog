import { NextPage } from "next";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import { format, parseISO } from "date-fns";

interface PostLayoutProps {
  params: { slug: string };
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

const PostLayout: NextPage<PostLayoutProps> = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Post Not found for slug: ${params.slug}`);

  return (
    <article>
      {post.thumbnail && (
        <div className="flex justify-center">
          <Image
            src={`/images/${post.thumbnail}`}
            alt={post.title}
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold">{post.title}</h2>
        <div className="text-right text-xl pt-8">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "yyyy년 M월 d일")}
          </time>
        </div>
      </div>
      <div className="my-12 max-w-screen-md mx-auto">
        <div
          className="[&>ol>li]:mt-4 [&>ol>li>p>strong]:text-2xl [&>h3]:font-semibold [&>h3]:text-2xl [&>h3]:my-4 [&>h3:last-child]:text-blue-500"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </div>
    </article>
  );
};

export default PostLayout;
