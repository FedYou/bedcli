import fs from "fs-extra";
import youfile from "youfile";
import existList from "../utils/existList.js";

export default ({ list, project: { path, output } }) => {
  existList({
    list,
    project: { output, path },
    func: (entryPath, outputPath) => {
      if (fs.existsSync(outputPath)) return;
      youfile.copy(entryPath, outputPath);
    },
  });
};
