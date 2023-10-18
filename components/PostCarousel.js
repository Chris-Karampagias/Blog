"use client";
import { useLatestPosts } from "@/utils/apiHooks";
import Link from "next/link";

export default function PostCarousel() {
  const [posts, error, loading] = useLatestPosts();
  return (
    <>
      {error && (
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
            <span>Failed to load latest posts</span>
          </div>
        </div>
      )}
      {loading && (
        <div className="relative h-[400px] alert">
          <span className="loading loading-spinner loading-lg top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute"></span>
        </div>
      )}
      {posts && (
        <div className="carousel overflow-y-hidden h-[400px] w-[95%] mx-auto rounded-lg">
          {posts.map((post, index) => {
            return (
              <div
                id={"slide" + `${index + 1}`}
                key={post._id}
                className="carousel-item relative w-full"
              >
                <div
                  className="hero h-full"
                  style={{
                    backgroundImage: `url(http://localhost:4000/${post.image})`,
                  }}
                >
                  <div className="hero-overlay bg-opacity-60"></div>
                  <div className="hero-content flex-col text-center text-white">
                    <div className="max-w-sm flex flex-col space-y-32 md:space-y-20">
                      <h1 className="mb-5 text-center text-3xl md:text-5xl font-bold">
                        {post.title}
                      </h1>
                      <p className="text-ellipsis text-2xl hidden md:inline whitespace-nowrap overflow-hidden ">
                        {post.description}
                      </p>
                      <Link
                        href=""
                        className="btn btn-secondary w-fit self-center"
                      >
                        View Post
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <Link
                    href={index === 0 ? "#slide3" : `#slide${index}`}
                    className="btn btn-circle"
                  >
                    ❮
                  </Link>
                  <Link
                    href={index === 2 ? "#slide1" : `#slide${index + 2}`}
                    className="btn btn-circle"
                  >
                    ❯
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
