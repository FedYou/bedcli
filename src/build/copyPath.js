import yfile from "youfile";
import existList from "../utils/existList.js";
import clearLine from "../utils/clearLine.js";
import { basename } from "path";
function message(path) {
  path = basename(path);
  console.log(`${" - ".black.bgWhite} Reading path`.dim.bold, path.dim.red);
  const text = `${" ✓ ".bgGreen} Path read ${path.red}`.bold;

  return text;
}

export default ({ list, project: { output, path } }) => {
  existList({
    list,
    project: { output, path },
    func: (entryPath, outputPath) => {
      const msg = message(entryPath);
      yfile.copy(entryPath, outputPath);
      clearLine();
      console.log(msg);
    },
  });
};
