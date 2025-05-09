import { getUserSession } from "@/lib/server-util";

const HomePage = async () => {
  const _session = await getUserSession();
  return <div>Home Page</div>;
};

export default HomePage;
