import fs from "fs-extra";
import { join } from "path";

export default ({ list, project: { path, output } }) => {
  list.forEach((name) => {
    let entryPath = join(path, name);

    if (!fs.existsSync(entryPath)) return;
    const outputPath = join(output, name);

    if (fs.existsSync(outputPath)) return;
    fs.symlinkSync(entryPath, outputPath);
  });
};
