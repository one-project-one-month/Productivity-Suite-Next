import { getUserSession } from "@/lib/server-util";

const HomePage = async () => {
  const session = await getUserSession();
  return (
    <div>
      <h1>Welcome {session?.user.name ?? "Guest"}</h1>
    </div>
  );
};

export default HomePage;
