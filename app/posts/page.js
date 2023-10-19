"use client";
import SearchBar from "@/components/Searchbar";
import PostList from "@/components/PostList";
import { createContext, useState } from "react";
import { usePosts } from "@/utils/apiHooks";

export const DataContext = createContext(null);

export default function Posts() {
  const [posts, error, loading] = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <DataContext.Provider value={{ posts, error, loading }}>
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
            <span>Failed to load posts</span>
          </div>
        </div>
      )}
      {posts && (
        <div className="space-y-10 mt-10 w-full">
          <SearchBar
            filteredPosts={filteredPosts}
            setFilteredPosts={setFilteredPosts}
          />
          <PostList filteredPosts={filteredPosts} />
        </div>
      )}
    </DataContext.Provider>
  );
}
