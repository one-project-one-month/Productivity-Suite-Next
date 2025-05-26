export default function Transparency() {
  return (
    <div className="">
      <p className="text-3xl font-bold mb-7">Transparency First</p>

      <div className="flex flex-col gap-5 md:gap-10">
        <div className="flex">
          <div className="size-6 shrink-0 bg-background [box-shadow:inset_0_0_0_8px_#22c55e] mt-1 rounded-full block mr-2" />
          <div className="">
            <p className="font-medium text-lg">100% Open Source</p>
            <p className="text-foreground/80">
              All Code is availabe on Github under MIT license
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="size-6 shrink-0 bg-background [box-shadow:inset_0_0_0_8px_#3b82f6] mt-1 rounded-full block mr-2" />
          <div className="">
            <p className="font-medium text-lg">Community Governed</p>
            <p className="text-foreground/80">
              Features and roadmap decided by the community
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="size-6 shrink-0 bg-background [box-shadow:inset_0_0_0_8px_#a855f7] mt-1 rounded-full block mr-2" />
          <div className="">
            <p className="font-medium text-lg">No Vendor Lock-in</p>
            <p className="text-foreground/80">
              Export your data anytime, run it anywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
