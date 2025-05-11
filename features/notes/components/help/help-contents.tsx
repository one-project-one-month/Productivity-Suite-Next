import TypoStyle from "../typo-style";
import HelpEditor from "./help-editor";


const commands = [
  "# Header 1", "## Header 2", "### Header 3", 
  "**bold**", "*italic*", "***bold & italic***", "~~strike~~", 
  "`code`",
  "``` code block ```",
  "> quote text",
  "[google](https://www.google.com)",
  "- item-1\n- item-2",
  "1. item-1\n2. item-2",
];

export default function HelpContents() {

  return (
    <TypoStyle>
        {
          commands.map(cmd => (
            <div className="grid grid-cols-2 *:border *:place-content-center *:text-left *:pl-2" key={cmd}>
              <span className="font-mono text-sm">{cmd}</span><HelpEditor body={cmd} />
            </div>
          ))
        }
    </TypoStyle>

  );
}
