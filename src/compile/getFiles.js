import fs from "fs-extra";
import { join } from "path";
import youfile from "youfile";

function byFolders(folders, packPath, cachePath) {
  return folders
    .map((folderName) => {
      const folderPath = join(packPath, folderName);
      if (fs.pathExistsSync(folderPath)) {
        const path = youfile.read.dir.getAllFiles(folderPath);
        const output = path.map((path) =>
          join(cachePath, path.replace(packPath, ""))
        );
        return {
          path,
          output,
        };
      }
    })
    .filter(Boolean);
}
function byList(files, packPath, cachePath) {
  const path = files
    .map((filePath) => {
      const resPath = join(packPath, filePath);
      if (fs.pathExistsSync(resPath)) return resPath;
    })
    .filter(Boolean);

  const output = path.map((path) => {
    return join(cachePath, path.replace(packPath, ""));
  });
  return [{ path, output }];
}

export default ({ packPath, cachePath, path }) => {
  const folders = byFolders(path.folders, packPath, cachePath);
  const files = byList(path.files, packPath, cachePath);
  return folders.concat(files);
};
