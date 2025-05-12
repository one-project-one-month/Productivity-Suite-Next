import React from "react";

export default function TypoStyle({children}: {children: React.ReactNode}) {
  return (
    <div className="
      max-w-full min-h-full bg-muted
      prose dark:prose-invert 
      prose-li:leading-7 prose-li:my-0 prose-li:py-0 prose-p:in-prose-li:p-0
      prose-headings:py-0 prose-headings:my-2 
      prose-p:leading-6 prose-p:my-0 prose-p:py-1
      prose-code:bg-[oklch(0.205_0_0)] prose-code:px-1.5 prose-code:text-wrap prose-code:py-1 prose-code:rounded-xs prose-code:text-white prose-code:my-0 prose-code:font-medium
      prose-blockquote:my-1 prose-blockquote:py-1
      prose-pre:bg-[oklch(0.205_0_0)] prose-code:in-prose-pre:bg-transparent prose-code:in-prose-pre:text-white prose-pre:my-2 prose-pre:text-wrap prose-pre:hyphens-auto prose-code:in-prose-pre:text-wrap
      prose-a:text-blue-500 prose-a:underline prose-a:cursor-pointer prose-a:hover:no-underline
      prose-table:w-fit prose-th:px-2 prose-tr:py-1 prose-td:p-0 prose-table:border prose-td:border prose-th:border prose-table:**:border-black
    ">
      {children}
    </div>
  );
}
