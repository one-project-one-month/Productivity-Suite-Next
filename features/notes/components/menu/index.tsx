import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import LinkOption from "@/features/notes/components/menu/link-menu-option";
import { menuOptions } from "@/features/notes/components/menu/menu-option";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const options = menuOptions(editor);
  const separator = [2, 5, 7, 10];

  return (
    <div className="border rounded-sm p-1 mb-1 bg-background z-50 flex flex-wrap gap-1">
      {options.map((option, idx) => (
        <div key={idx} title={option.name} className="contents">
          <Toggle
            pressed={option.pressed}
            onPressedChange={option.onClick}
            variant="outline"
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-muted cursor-pointer"
          >
            {option.icon}
          </Toggle>
          {separator.includes(idx) && (
            <div className="w-[1.5px] h-7 hidden sm:block my-auto mx-2 bg-muted-foreground/30"></div>
          )}
        </div>
      ))}
      <LinkOption editor={editor} />
    </div>
  );
}
