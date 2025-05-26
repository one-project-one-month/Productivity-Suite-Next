import { Github, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CommunityGitCard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 bg-white dark:bg-white/10 border border-white/10 rounded-md shadow-lg shadow-black/10">
        <h2 className="font-medium text-lg">🚀 Getting Started</h2>
        <p className="text-foreground/80 my-4">
          Ready to contribute? Check out our contributor guide and join our
          Discord community.
        </p>
        <div className="flex gap-2">
          <Link
            href="https://github.com/one-project-one-month/Productivity-Suite-Next"
            className="flex gap-4 font-medium w-max items-center border border-muted-foreground/50 rounded-md px-3 py-1 hover:bg-muted-foreground/10"
          >
            <Github size={16} /> Contribute
          </Link>
          <Link
            href="https://www.discord.com/app"
            className="flex gap-4 font-medium w-max items-center border border-muted-foreground/50 rounded-md px-3 py-1 hover:bg-muted-foreground/10"
          >
            <MessageCircle size={16} /> Discord
          </Link>
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-white/10 border border-white/10 rounded-md shadow-lg shadow-black/10">
        <h2 className="font-medium text-lg">🐞 Report Bug</h2>
        <p className="text-foreground/80 my-4">
          Found a bug? Let us know on GitHub by opening an issue.
        </p>
        <Link
          href="https://github.com/one-project-one-month/Productivity-Suite-Next/issues"
          className="gap-4 block text-center font-medium w-full items-center border border-muted-foreground/50 rounded-md px-3 py-1 hover:bg-muted-foreground/10"
        >
          Open Issue
        </Link>
      </div>
    </div>
  );
}
