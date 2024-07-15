import youfile from "youfile";
import existList from "../utils/existList.js";
import obfuscator from "../utils/obfuscator.js";
import getJson from "../utils/getJson.js";
import "../utils/console/index.js";

function minify(pathFile) {
  console.new.waitPath("Obfuscated file", pathFile);
  youfile.write.file(pathFile, obfuscator.encode(youfile.read.file(pathFile)));
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
