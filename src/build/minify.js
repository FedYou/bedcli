import youfile from "youfile";
import "../utils/console/index.js";

function func(path) {
  console.new.waitPath("Minifying file", path);
  youfile.write.json(path, youfile.read.json5(path));
  console.new.clearLine();
  console.new.checkPath("Manified file", path);
}

export default (path) => {
  youfile.read.dir
    .getAllExtnameFiles(path, ".json")
    .forEach((pathFile) => func(pathFile));
};
