"use client";
import { usePathname } from "next/navigation";
import { usePost } from "@/utils/apiHooks";
import { DateTime } from "luxon";
import Link from "next/link";
import Image from "next/image";
import Comments from "@/components/Comments";
import htmlDecode from "@/utils/decodeHTML";

export default function Post() {
  const pathname = usePathname();
  const postId = pathname.split("/")[2];
  const postQuery = usePost(postId);

  const formatDate = (date) => {
    const dateObject = new Date(date);
    return DateTime.fromJSDate(dateObject).toLocaleString(
      DateTime.DATETIME_MED
    );
  };

  return (
    <>
      {postQuery.isPending && (
        <div className="relative">
          <span className="loading loading-spinner loading-lg top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute"></span>
        </div>
      )}
      {postQuery.isError && (
        <div className="alert h-[400px] relative">
          <div className="text-xl flex gap-2 items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Failed to load post</span>
          </div>
        </div>
      )}
      {postQuery.isSuccess && (
        <div className="h-full w-[80%] flex flex-col gap-10 md:gap-20 self-center mb-auto mt-10">
          <div className="flex flex-col gap-5 sm:flex-row justify-between">
            <h1 className="text-2xl md:text-5xl self-center">
              {postQuery.data.title}
            </h1>
            <div className="flex self-center md:self-start flex-col">
              <p className="text-slate-500 mt-3 lg:text-xl 2xl:text-2xl">
                <span className="font-bold">Posted: </span>
                {formatDate(postQuery.data.postedAt)}
              </p>
              <p className="text-slate-500 mt-3 lg:text-xl 2xl:text-2xl">
                <span className="font-bold">Last edit: </span>
                {formatDate(postQuery.data.updatedAt)}
              </p>
            </div>
          </div>
          <Image
            src={
              "https://blog-api-production-a764.up.railway.app/" +
              postQuery.data.image
            }
            width={1200}
            height={1200}
            alt="Post image"
            className="self-center rounded-md"
          />
          <Link
            href="#comments"
            className="chat chat-start self-end md:mr-10 min-[2000px]:mr-20"
          >
            <div className="chat-bubble bg-secondary text-white flex justify-center text-xl font-bold h-3 w-3 md:h-10 md:w-10">
              {postQuery.data.comments.length}
            </div>
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html: postQuery.data.description,
            }}
            className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 text-md md:text-3xl border-t-[1px] border-gray-200"
          />
          <Comments comments={postQuery.data.comments} postId={postId} />
        </div>
      )}
    </>
  );
}
