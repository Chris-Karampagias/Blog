"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Comments({ postId, comments }) {
  const queryClient = useQueryClient();
  const [commentToAdd, setCommentToAdd] = useState({
    authorName: "",
    title: "",
    content: "",
  });

  const commentsMutation = useMutation({
    mutationFn: (commentToAdd) => addComment(postId, commentToAdd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const formatDate = (date) => {
    const dateObject = new Date(date);
    return DateTime.fromJSDate(dateObject).toLocaleString(
      DateTime.DATETIME_MED
    );
  };

  const addComment = (postId, commentToAdd) => {
    return fetch(
      `https://blog-api-production-a764.up.railway.app/api/posts/${postId}/comments`,
      {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentToAdd),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        toast.success("Comment added succesfully");
        return res.json();
      })
      .catch((err) => {
        toast.error(err.message);
        throw new Error(err.message);
      });
  };

  return (
    <div
      id="comments"
      className="border-t-[1px] w-full flex flex-col gap-10 border-gray-200"
    >
      <h2 className="text-xl md:text-3xl translate-y-[-55%] translate-x-[30%] bg-white w-fit">
        Comments
      </h2>
      <form
        className="p-2 flex flex-col justify-between items-center gap-5 pt-0 self-center border-x-[1px] border-b-[2px] rounded-2xl border-gray-200 w-full md:w-1/2"
        encType="multipart/form-data"
        action=""
        method=""
        onSubmit={(e) => {
          e.preventDefault();
          commentsMutation.mutate(commentToAdd);
          setCommentToAdd({
            authorName: "",
            title: "",
            content: "",
          });
        }}
      >
        <h3 className="text-xl lg:text-2xl mb-2 font-bold">Leave a comment</h3>
        <div className="flex flex-col">
          <label
            className="translate-y-[50%] translate-x-[50%] bg-white w-fit px-1 text-lg lg:text-2xl"
            htmlFor="authorName"
          >
            Name
          </label>
          <input
            id="authorName"
            type="text"
            name="authorName"
            value={commentToAdd.authorName}
            onChange={(e) => {
              setCommentToAdd({ ...commentToAdd, authorName: e.target.value });
            }}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="translate-y-[50%] translate-x-[50%] bg-white w-fit px-1 text-lg lg:text-2xl"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={commentToAdd.title}
            onChange={(e) => {
              setCommentToAdd({ ...commentToAdd, title: e.target.value });
            }}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col justify-center w-[95%] h-[200px]">
          <label
            className="translate-y-[50%] translate-x-[50%] bg-white w-fit px-1 text-lg lg:text-2xl"
            htmlFor="content"
          >
            Comment
          </label>
          <textarea
            id="content"
            name="content"
            value={commentToAdd.content}
            onChange={(e) => {
              setCommentToAdd({ ...commentToAdd, content: e.target.value });
            }}
            className="textarea textarea-bordered min-h-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className={
            commentsMutation.isPending
              ? "btn btn-accent self-center mt-2 btn-disabled"
              : "btn btn-accent self-center mt-2"
          }
        >
          {commentsMutation.isPending && (
            <span className="loading loading-spinner"></span>
          )}
          Post
        </button>
      </form>
      {comments.length === 0 && (
        <div className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-xl md:text-2xl">
            No comments yet! Be the first to comment
          </span>
        </div>
      )}
      {comments.length > 0 && (
        <div className="w-full mt-20 flex flex-col gap-14 items-center">
          {comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className="card w-full mx-2 md:w-2/3 h-[250px] bg-base-100 shadow-xl"
              >
                <div className="card-body overflow-y-hidden p-3">
                  <div className="flex flex-col items-center md:flex-row justify-between border-b-[1px] border-gray-200">
                    <h2 className="card-title lg:tex-2xl w-fit md:w-4/5">
                      <span className="font-bold">@</span>
                      {comment.authorName}
                    </h2>
                    <p className="text-slate-500 mt-3 lg:text-xl">
                      <span className="font-bold">Posted: </span>
                      {formatDate(comment.postedAt)}
                    </p>
                  </div>
                  <h2 className="lg:text-xl font-bold">{comment.title}</h2>
                  <p className="ml-2 text-xl overflow-y-auto break-words">
                    <span className="font-bold md:text-2xl mr-3">&gt;</span>
                    {comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {commentsMutation.isError && (
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
            <span>Failed to post comment</span>
          </div>
        </div>
      )}
    </div>
  );
}
