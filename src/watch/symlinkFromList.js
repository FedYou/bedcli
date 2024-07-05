import fs from "fs-extra";
import { join } from "path";
import existList from "../utils/existList.js";

export default ({ list, project: { path, output } }) => {
  existList({
    list,
    project: { output, path },
    func: (entryPath, outputPath) => {
      if (fs.existsSync(outputPath)) return;
      fs.symlinkSync(entryPath, outputPath);
    },
  });
};
