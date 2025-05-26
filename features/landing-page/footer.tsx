import { Github, Heart, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-center flex flex-col gap-7 items-center justify-center py-10 border-t border-white/10">
      <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 dark:from-blue-400 via-purple-500 to-blue-500 inline-block text-transparent bg-clip-text">
        FlowHub
      </h1>
      <p className="max-w-3xl px-2 text-white/80">
        The open-source productivity suite built by developers, for everyone.
        Join our community and help shape the future of productivity tools.
      </p>
      <div className="flex gap-3 text-white/80">
        <Github />
        <Twitter />
        <MessageCircle />
      </div>
      <hr className="border border-white/5 w-[calc(100%-50px)] max-w-7xl mx-auto" />
      <div className="text-sm text-white/70">
        <p className="">
          &copy; {new Date().getFullYear()} FlowHub. Open source under MIT
          License.
        </p>
        <p className="mt-3">
          Made with <Heart className="text-red-400 inline size-4 mx-1" /> by the
          community.
        </p>
      </div>
    </footer>
  );
}
