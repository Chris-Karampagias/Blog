import Hero from "@/components/Hero";
import PostCarousel from "@/components/PostCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-36">
      <Hero />
      <h1 className="self-center text-3xl md:text-5xl border-b-[1px] border-slate-300">
        Latest Posts
      </h1>
      <PostCarousel />
    </div>
  );
}
