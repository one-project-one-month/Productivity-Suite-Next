import CardSection from "@/features/landing-page/card-section";
import HeroSection from "@/features/landing-page/top-section";
import { getUserSession } from "@/lib/server-util";

const HomePage = async () => {
  const _session = await getUserSession();
  return (
    <>
      <HeroSection />
      <CardSection />
    </>
  );
};

export default HomePage;
