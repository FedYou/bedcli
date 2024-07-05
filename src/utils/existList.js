import fs from "fs-extra";
import { join } from "path";

export default ({ list, project: { path, output }, func = () => {} }) => {
  list.forEach((name) => {
    let entryPath = join(path, name);

    if (!fs.existsSync(entryPath)) return;
    if (output) {
      const outputPath = join(output, name);

      func(entryPath, outputPath);
    } else func(entryPath);
  });
};
