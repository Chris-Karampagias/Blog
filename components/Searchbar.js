"use client";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/app/posts/page";

export default function SearchBar({ filteredPosts, setFilteredPosts }) {
  const { posts } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");

  const search = () => {
    posts.forEach((post) => {
      if (post.title.toLowerCase() === searchValue.toLowerCase()) {
        setFilteredPosts([post]);
      } else if (post.title.toLowerCase().includes(searchValue.toLowerCase())) {
        const postExists = filteredPosts.some(
          (filteredPost) => filteredPost._id === post._id
        );
        if (!postExists) {
          setFilteredPosts([...filteredPosts, post]);
        }
      }
    });
  };

  useEffect(() => {
    search();
    if (searchValue === "") {
      setFilteredPosts([]);
    }
  }, [searchValue]);

  return (
    <div className="form-control mx-5 sm:mx-auto sm:max-w-md md:max-w-lg xl:max-w-2xl">
      <input
        type="text"
        placeholder="Search for a specific post..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className="input input-bordered shadow-grey shadow-md md:text-2xl w-full "
      />
    </div>
  );
}
