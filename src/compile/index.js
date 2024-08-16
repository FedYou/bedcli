import fs from "fs-extra";
import console from "../utils/console/index.js";
import { join, basename } from "path";
import youfile from "youfile";
import { Cache } from "youcache";
import { MANIFEST_TYPES } from "../enum.js";
import dataToCompile from "../utils/manifest/dataToCompile.js";
import dCompile from "../../json/compile.json" assert { type: "json" };

function copyToCache(listPath, entryPath, ouputPath) {
  youfile.write.dir(ouputPath);
  listPath.forEach((fileName) => {
    const filePath = join(entryPath, fileName);
    if (fs.pathExistsSync(filePath)) {
      youfile.copy(filePath, join(ouputPath, basename(fileName)));
    }
  });
}

export default (packPath) => {
  const manifestPath = join(packPath, "manifest.json");

  if (!fs.pathExistsSync(manifestPath)) {
    console.error("The manifest.json file does not exist.");
  }
  const manifest = youfile.read.json(manifestPath);
  const cache = new Cache("bedcli");
  const data = dataToCompile(manifest);
  const TYPE = data.type;

  let files;

  switch (TYPE) {
    case MANIFEST_TYPES.RESOURCES:
      files = dCompile.resource;
      break;
    case MANIFEST_TYPES.DATA:
    case MANIFEST_TYPES.DATA_SCRIPT:
      files = dCompile.behavior;
      break;
    case MANIFEST_TYPES.SCRIPT:
      files = dCompile.behavior;
      break;
    case MANIFEST_TYPES.SKIN:
      files = dCompile.resource;
      break;
  }

  copyToCache(files, packPath, cache.path);

  const subpacksPath = join(packPath, "subpacks");
  const subpacksCachePath = join(cache.path, "subpacks");

  if (fs.pathExistsSync(subpacksPath) && manifest.subpacks.length > 0) {
    const existingFolders = manifest.subpacks.map(({ folder_name }) => {
      if (fs.pathExistsSync(join(subpacksPath, folder_name))) {
        return folder_name;
      }
    });
    existingFolders.forEach((folderName) => {
      const entryPath = join(subpacksPath, folderName);
      const ouputPath = join(subpacksCachePath, folderName);
      copyToCache(files, entryPath, ouputPath);
    });
  }

  // Minify json
  const jsonFiles = youfile.read.dir.getAllExtnameFiles(cache.path, ".json");

  jsonFiles.forEach((filePath) => {
    youfile.write.json(filePath, youfile.read.json5(filePath));
  });
};
