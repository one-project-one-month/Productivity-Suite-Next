import { getUserSession } from "@/lib/server-util";
import NavItems from "./nav-items";

export default async function Nav() {
  const session = await getUserSession();
  return (
    <nav className="bg-muted w-full mx-auto z-10 shadow-sm shadow-black/10">
      <NavItems session={session} />
    </nav>
  );
}
