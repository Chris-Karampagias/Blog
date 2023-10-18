"use client";
import { useState, useEffect } from "react";

export const useLatestPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/posts/latest", {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((latestPosts) => {
        setPosts(latestPosts);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return [posts, error, loading];
};
