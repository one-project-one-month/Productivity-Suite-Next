import CardSection from "@/features/landing-page/card-section";
import HeroSection from "@/features/landing-page/top-section";
import { getUserSession } from "@/lib/server-util";

const HomePage = async () => {
  const session = await getUserSession();
  return (
    <section className="scroll-smooth">
      <h1>Welcome {session?.user.name ?? "Guest"}</h1>
      <HeroSection />
      <CardSection />
    </section>
  );
};

export default HomePage;
