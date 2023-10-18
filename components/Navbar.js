"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 shadow-md shadow-slate-400   bg-primary">
      <div className="flex-1">
        <Link
          href="/home"
          className="btn btn-ghost text-white text-3xl normal-case"
        >
          Cool Blog
        </Link>
      </div>
      <div className="flex-none sm:hidden">
        <ul className="menu menu-horizontal menu-md px-1">
          <li>
            <details>
              <summary className="after:hidden text-white">
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
              </summary>
              <ul className="p-2 w-[100px] translate-x-[-15%] bg-base-100">
                <li>
                  <Link href="/home" className="btn btn-ghost normal-case">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/home" className="btn btn-ghost normal-case">
                    Posts
                  </Link>
                </li>
              </ul>
            </details>
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
