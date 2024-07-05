import yfile from "youfile";
import "../utils/console/index.js";

function func(path) {
  console.new.waitPath("Minifying file", path);
  yfile.write.json(path, yfile.read.json5(path));
  console.new.clearLine();
  console.new.checkPath("Manified file", path);
}

export default (path) => {
  yfile.read.dir
    .getAllExtnameFiles(path, ".json")
    .forEach((pathFile) => func(pathFile));
};
