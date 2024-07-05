import yfile from "youfile";
import { basename } from "path";
import clearLine from "../utils/clearLine.js";
function message(path) {
  path = basename(path);
  console.log(`${" - ".black.bgWhite} Minifying file`.dim.bold, path.dim.red);
  const text = `${" ✓ ".bgGreen} Manified file ${path.red}`.bold;

  return text;
}

export default (path) => {
  const msg = message(path);
  console.time(msg);
  yfile.write.json(path, yfile.read.json5(path));
  clearLine();
  console.timeEnd(msg);
};
