import youfile from "youfile";
import existList from "../utils/existList.js";
import "../utils/console/index.js";

function func(entryPath, outputPath) {
  console.new.waitPath("Reading path", outputPath);
  youfile.copy(entryPath, outputPath);
  console.new.clearLine();
  console.new.checkPath("Path read", outputPath);
}

export default ({ list, project: { output, path } }) => {
  existList({
    list,
    project: { output, path },
    func,
  });
};
