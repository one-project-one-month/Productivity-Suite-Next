import { getUserSession } from "@/lib/server-util";
import NavItems from "./nav-items";

export default async function Nav() {
  const session = await getUserSession();
  return (
    <nav className="bg-muted max-w-7xl mx-auto z-10 shadow-sm shadow-black/10 mb-2">
      <NavItems session={session} />
    </nav>
  );
}
