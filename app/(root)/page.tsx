// import CardSection from "@/features/landing-page/card-section";
// import HeroSection from "@/features/landing-page/top-section";
import Community from "@/features/landing-page/community";
import Content from "@/features/landing-page/content";
import Footer from "@/features/landing-page/footer";
import HeroSection from "@/features/landing-page/hero-section";
// import { getUserSession } from "@/lib/server-util";

const HomePage = async () => {
  // const session = await getUserSession();
  // console.log(session);
  const res = await fetch(
    "https://api.github.com/repos/one-project-one-month/Productivity-Suite-Next",
    { cache: "force-cache" },
  ).catch(() => ({
    json: () => ({ stargazers_count: 0, forks_count: 0, open_issues_count: 0 }),
  }));
  const data = await res.json();

  const resContributors = await fetch(
    "https://api.github.com/repos/one-project-one-month/Productivity-Suite-Next/contributors",
    { cache: "force-cache" },
  ).catch(() => ({ json: () => [] }));
  const contributors = await resContributors.json();

  const resMerged = await fetch(
    "https://api.github.com/repos/one-project-one-month/Productivity-Suite-Next/pulls",
    { cache: "force-cache" },
  ).catch(() => ({ json: () => [{ number: 0 }] }));
  const merged = await resMerged.json();

  const resCommits = await fetch(
    "https://api.github.com/repos/one-project-one-month/Productivity-Suite-Next/contributors?per_page=100&anon=true",
    { cache: "force-cache" },
  ).catch(() => ({ json: () => [] }));
  const commits = (await resCommits.json())
    .map((commit: { contributions: number }) => commit.contributions)
    .reduce((a: number, b: number) => a + b);

  return (
    <section className="scroll-smooth mx-auto">
      <HeroSection
        stars={data.stargazers_count ?? 0}
        forks={data.forks_count ?? 0}
      />
      <Content />
      <Community
        contributors={contributors.length ?? 0}
        PRs={data.open_issues_count ?? 0}
        commits={commits ?? 0}
        merged={merged[0].number ?? 0}
      />
      <Footer />
    </section>
  );
};

export default HomePage;
