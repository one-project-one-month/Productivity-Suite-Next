import Link from "next/link";

export default function ContentCard({
  link,
  icon,
  title,
  desc,
  style,
}: {
  link: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  style: string;
}) {
  return (
    <Link
      href={link}
      className={
        "group border border-muted rounded-xl shadow-lg cursor-pointer text-center py-8 px-2 sm:px-5 md:px-2 space-y-3 hover:-translate-y-2 transition-transform ease-in duration-200" +
        " " +
        style
      }
    >
      <div className="size-16 group-hover:scale-110 transition-transform duration-200 rounded-2xl mx-auto grid place-items-center text-white shadow-md shadow-black/10">
        {icon}
      </div>
      <p className="text-xl font-bold ">{title}</p>
      <p className="text-foreground/80 lg:text-sm text-balance">{desc}</p>
    </Link>
  );
}
