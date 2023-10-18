"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectMessage() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/home"), 500);
  }, []);
  return (
    <div className="absolute flex flex-col gap-3 items-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <span className="loading loading-spinner loading-lg "></span>
      <h1 className="text-2xl">Redirecting you to the Home page</h1>
    </div>
  );
}
