"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

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

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/api/posts", {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((postData) => {
        setPosts(postData);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return [posts, error, loading];
};

export const usePost = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: ({ queryKey }) => {
      return fetch(`http://localhost:4000/api/posts/${queryKey[1]}`, {
        mode: "cors",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Server error");
          }
          return res.json();
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 2,
  });
};
