"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export default function Comments({ post, setCommentsCount }) {
  const [comments, setComments] = useState(post.comments);
  const [commentToAdd, setCommentToAdd] = useState({
    authorName: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    setCommentsCount(comments.length);
  }, []);

  const [loading, setLoading] = useState(null);

  const formatDate = (date) => {
    const dateObject = new Date(date);
    return DateTime.fromJSDate(dateObject).toLocaleString(
      DateTime.DATETIME_MED
    );
  };

  const addComment = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/posts/${post._id}/comments`,
        {
          method: "PUT",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentToAdd),
        }
      );
      if (!res.ok) {
        throw new Error("Server error");
      }
      const result = await res.json();
      if (result.error) {
        result.error.forEach((err) => {
          toast.error(err.message);
        });
        return;
      }
      toast.success("Comment added succesfully");
      setComments([
        { ...commentToAdd, postedAt: new Date(Date.now()), _id: uuidv4() },
        ...comments,
      ]);
      setCommentToAdd({
        authorName: "",
        title: "",
        content: "",
      });
      setCommentsCount(comments.length + 1);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
        onSubmit={async (e) => {
          e.preventDefault();
          await addComment();
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
            loading
              ? "btn btn-accent self-center mt-2 btn-disabled"
              : "btn btn-accent self-center mt-2"
          }
        >
          {loading && <span className="loading loading-spinner"></span>}
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
    </div>
  );
}
