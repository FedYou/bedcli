import fs from "fs-extra";
import Parse from "fast-json-parse";
import console from "../utils/console/index.js";
import youfile from "youfile";
const regex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|\/\/.*|\/\*[\s\S]*?\*\/)/g;

export default async (entry, output) => {
  const fileContent = fs.readFileSync(entry, "utf-8");
  let json = new Parse(fileContent);

  if (json.err) {
    const content = fileContent.replace(regex, (match) => {
      if (match.startsWith('"') || match.startsWith("'")) {
        return match;
      }
      return "";
    });

    json = new Parse(content);
    if (json.err) {
      console.error("unable to parse json", json.err.message);
    }
  }
  youfile.write.json(output, json.value);
};
