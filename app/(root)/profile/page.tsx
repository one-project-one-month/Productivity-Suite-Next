import { getUserSession } from "@/lib/server-util";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return notFound();
  }

  return (
    <section className="">
      <h1 className="">Profile page</h1>
      <p className="">{session.user.name}</p>
    </section>
  );
}
