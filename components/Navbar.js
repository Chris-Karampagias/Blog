"use client";
import Link from "next/link";
import { useRef } from "react";

export default function Navbar() {
  const options = useRef(null);
  return (
    <div className="navbar z-10 sticky top-0 bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link
          href="/home"
          className="btn btn-ghost text-3xl normal-case text-white"
        >
          Tech Hub
        </Link>
      </div>
      <div className="sm:hidden">
        <ul className="menu menu-md px-1">
          <li>
            <div className="flex flex-col relative">
              <div
                onClick={() => options.current.classList.toggle("opacity-0")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-10 h-10 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </div>
              <ul
                className="p-2 w-[100px] bg-base-100 absolute translate-y-[55%] translate-x-[-11%] rounded-lg transition-all duration-300 opacity-0"
                ref={options}
              >
                <li>
                  <Link
                    href="/home"
                    className="btn normal-case text-neutral"
                    onClick={() =>
                      options.current.classList.toggle("opacity-0")
                    }
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    className="btn btn-ghost normal-case text-neutral-content"
                    onClick={() =>
                      options.current.classList.toggle("opacity-0")
                    }
                  >
                    Posts
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="hidden sm:block">
        <Link
          href="/home"
          className="btn btn-ghost text-white text-3xl normal-case"
        >
          Home
        </Link>
        <Link
          href="/posts"
          className="btn btn-ghost text-white text-3xl normal-case"
        >
          Posts
        </Link>
      </div>
    </div>
  );
}
