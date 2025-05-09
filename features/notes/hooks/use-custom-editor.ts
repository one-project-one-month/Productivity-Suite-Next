import { useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import CharacterCount from "@tiptap/extension-character-count";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import { setUpCodeBlock } from "../components/code-block";


  export const useCustomEditor = (body:string) => {
    const lowlight = setUpCodeBlock();
    return useEditor({
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          horizontalRule: {
            HTMLAttributes: {
              class: "py-0! my-3! border! border-muted-foreground!",
            },
          },
          codeBlock: false,
          document: false,
          listItem: false,
        }),
  
        CodeBlockLowlight.configure({
          lowlight,
          defaultLanguage: "plaintext",
        }),
        Typography,
        ListItem,
        Document,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Link,
        CharacterCount.configure({
          limit: 2048,
        }),
        Markdown.configure({
          html: false,
          tightLists: true,
          bulletListMarker: "-",
          linkify: true,
          breaks: false,
          transformPastedText: true,
          transformCopiedText: true,
        }),
      ],
      content: body,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: "bg-muted w-full min-h-[calc(100dvh-180px)] p-2 block  ",
        },
      },
    });
  };
