import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import csharp from "highlight.js/lib/languages/csharp";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import bash from "highlight.js/lib/languages/bash";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";

import { all, createLowlight } from "lowlight";

export function setUpCodeBlock() {
  const lowlight = createLowlight(all);
  const languages = { html, css, js, ts, csharp, c, cpp, bash, java, go };

  Object.entries(languages).forEach(([name, language]) => {
    lowlight.register(name, language);
  });

  return lowlight;
}
