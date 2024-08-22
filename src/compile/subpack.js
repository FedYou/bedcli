import fs from "fs-extra";
import { join } from "path";
import getFiles from "./getFiles.js";
import copyFiles from "./copyFiles.js";

export default async ({ entry, output, manifest, path }) => {
  const existingFolders = manifest.subpacks
    .map(({ folder_name }) => {
      return {
        path: join(entry, folder_name),
        output: join(output, folder_name),
      };
    })
    .filter((folder) => fs.pathExistsSync(folder.path));
  const allFiles = [];

  for (const subpack of existingFolders) {
    allFiles.push(
      ...getFiles({ packPath: subpack.path, cachePath: subpack.output, path })
    );
  }
  for (const file of allFiles) {
    await copyFiles(file.path, file.output);
  }
};
