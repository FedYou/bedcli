import yfile from "youfile";
import existList from "../utils/existList.js";
import obfuscator from "../utils/obfuscator.js";
import "../utils/console/index.js";

function getJson(entryPath, func) {
  const files = yfile.read.dir.getAllExtnameFiles(entryPath, ".json");
  files.forEach((pathFile) => func(pathFile));
}

function minify(pathFile) {
  console.new.waitPath("Obfuscated file", pathFile);
  yfile.write.file(pathFile, obfuscator.encode(yfile.read.file(pathFile)));
  console.new.clearLine();
  console.new.checkPath("Obfuscated file", pathFile);
}

function func(entryPath) {
  getJson(entryPath, minify);
}

export default (list, path) => {
  existList({
    list,
    project: { path },
    func,
  });
};
