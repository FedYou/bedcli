import yfile from "youfile";
import existList from "../utils/existList.js";
import obfuscator from "../utils/obfuscator.js";
import { basename } from "path";
import clearLine from "../utils/clearLine.js";

function message(path) {
  path = basename(path);
  console.log(`${" - ".black.bgWhite} Obfuscating file`.dim.bold, path.dim.red);
  const text = `${" ✓ ".bgGreen} Obfuscated file ${path.red}`.bold;

  return text;
}

function func(entryPath) {
  const files = yfile.read.dir.getAllExtnameFiles(entryPath, ".json");
  files.forEach((pathFile) => {
    const msg = message(pathFile);
    yfile.write.file(pathFile, obfuscator.encode(yfile.read.file(pathFile)));
    clearLine();
    console.log(msg);
  });
}

export default (list, path) => {
  existList({
    list,
    project: { path },
    func,
  });
};
