import Link from "next/link";

export default function Hero() {
  return (
    <div
      className="hero h-[600px]"
      style={{
        backgroundImage: "url(pexels-ketut-subiyanto-4126724.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content bg-black bg-opacity-60 rounded-2xl text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hi there!</h1>
          <p className="mb-5 text-lg">
            I&apos;m <span className="font-bold">Chris Karampagias</span> and
            this is my <span className="font-bold">Tech Hub</span>! You can
            expect from me to see content regarding web dev related stuff. Have
            fun exploring around!
          </p>
          <Link href="/posts" className="btn btn-secondary">
            View Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
