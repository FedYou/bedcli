import youfile from "youfile";
import existList from "../utils/existList.js";

export default ({ list, project: { output, path } }) => {
  existList({
    list,
    project: { output, path },
    func: (entryPath, outputPath) => {
      youfile.copy(entryPath, outputPath);
    },
  });
};
