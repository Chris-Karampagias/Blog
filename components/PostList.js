"use client";
import { useContext } from "react";
import { DataContext } from "@/app/posts/page";
import Image from "next/image";
import { DateTime } from "luxon";
import Link from "next/link";

export default function PostList({ filteredPosts }) {
  const { posts, error, loading } = useContext(DataContext);
  const formatDate = (date) => {
    const dateObject = new Date(date);
    return DateTime.fromJSDate(dateObject).toLocaleString(
      DateTime.DATETIME_MED
    );
  };

  return (
    <>
      {loading && (
        <div className="relative h-[400px] alert">
          <span className="loading loading-spinner loading-lg top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute"></span>
        </div>
      )}
      {posts && filteredPosts.length === 0 && !loading && (
        <div className="flex flex-col gap-20 w-full items-center">
          {posts.map((post) => {
            return (
              <Link
                href={`posts/${post._id}`}
                key={post._id}
                className="card sm:max-w-[600px] lg:max-w-[800px] mx-5 md:mx-0 bg-base-100 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <figure>
                  <Image
                    src={
                      "https://blog-api-production-a764.up.railway.app/" +
                      post.image
                    }
                    width={800}
                    height={800}
                    alt="Post image"
                  />
                </figure>
                <div className="card-body gap-5 p-2 md:p-5 ">
                  <div className="flex flex-col self-end">
                    <p className="text-slate-500 mt-2 text-sm lg:text-xl">
                      <span className="font-bold">Posted: </span>
                      {formatDate(post.postedAt)}
                    </p>
                    <p className="text-slate-500 mt-2 text-sm lg:text-xl">
                      <span className="font-bold">Last edit: </span>
                      {formatDate(post.updatedAt)}
                    </p>
                  </div>
                  <div className="card-title text-lg md:text-2xl xl:text-3xl">
                    <h2>{post.title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {posts && filteredPosts.length > 0 && !loading && (
        <div className="flex flex-col gap-20 w-full items-center">
          {filteredPosts.map((post) => {
            return (
              <Link
                href={`posts/${post._id}`}
                key={post._id}
                className="card sm:max-w-[600px] lg:max-w-[800px] mx-5 md:mx-0 bg-base-100 shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <figure>
                  <Image
                    src={
                      "https://blog-api-production-a764.up.railway.app/" +
                      post.image
                    }
                    width={800}
                    height={800}
                    alt="Post image"
                  />
                </figure>
                <div className="card-body gap-5 p-2 md:p-5 ">
                  <div className="flex flex-col self-end">
                    <p className="text-slate-500 mt-2 text-sm lg:text-xl">
                      <span className="font-bold">Posted: </span>
                      {formatDate(post.postedAt)}
                    </p>
                    <p className="text-slate-500 mt-2 text-sm lg:text-xl">
                      <span className="font-bold">Last edit: </span>
                      {formatDate(post.updatedAt)}
                    </p>
                  </div>
                  <div className="card-title text-lg md:text-2xl xl:text-3xl">
                    <h2>{post.title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
