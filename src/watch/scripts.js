import fs from "fs-extra";
import esbuild from "../utils/esbuild.js";
import { join } from "path";
export default (config, PATH) => {
  if (config.scripts.language !== "javascript") {
    console.new.error(
      `Error the language "${config.scripts.language}" is not supported`
    );
  }
  const entry = join(PATH.entry.behavior, config.scripts.entry);
  const output = join(PATH.output.behavior, config.scripts.entry);
  if (!fs.existsSync(entry))
    console.new.error(`The file "${entry}" does not exist`);
  esbuild(entry, output);
};
