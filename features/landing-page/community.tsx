import { Code, GitMerge, GitPullRequest, Heart, Users } from "lucide-react";
import CommunityCard from "./community-card";
import CommunityGitCard from "./community-git-card";
import Transparency from "./transparency";

export default function Community({
  contributors,
  PRs,
  commits,
  merged,
}: {
  contributors: number;
  PRs: number;
  commits: number;
  merged: number;
}) {
  return (
    <section className="py-10 bg-blue-500/5">
      <div className="">
        <div className="mx-auto px-3 py-1 rounded-full border border-blue-300 bg-background w-max flex gap-1 text-sm font-medium items-center">
          <Heart size={14} className="text-red-400" /> Open Source
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold my-7">
          Built by the Community
        </h1>
        <p className="text-foreground/80 text-center text-balance md:text-xl w-full max-w-2xl md:max-w-4xl px-2 text-lg mx-auto">
          FlowHub is completely source-available and community-driven. Join
          thousands of developers, designers, and productivity enthusiasts who
          are shaping the future of productivity tools.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 px-3 max-w-7xl mx-auto">
        <CommunityCard
          icon={<Users />}
          num={contributors}
          desc="Contributors"
        />
        <CommunityCard
          icon={<GitPullRequest />}
          num={PRs}
          desc="Pull Requests"
        />
        <CommunityCard icon={<GitMerge />} num={merged} desc="Merged" />
        <CommunityCard icon={<Code />} num={commits} desc="Commits" />
      </div>

      <div className="mt-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-7 max-w-7xl mx-auto">
        <Transparency />
        <CommunityGitCard />
      </div>
    </section>
  );
}
