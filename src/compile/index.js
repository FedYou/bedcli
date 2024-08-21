import fs from "fs-extra";
import console from "../utils/console/index.js";
import { join, basename, dirname } from "path";
import youfile from "youfile";
import { Cache } from "youcache";
import { MANIFEST_TYPES } from "../enum.js";
import dataToCompile from "../utils/manifest/dataToCompile.js";
import dCompile from "../../json/compile.json" assert { type: "json" };
import lang from "./lang.js";
import copyFiles from "./copyFiles.js";

export default async (packPath) => {
  const manifestPath = join(packPath, "manifest.json");

  if (!fs.pathExistsSync(manifestPath)) {
    console.error("The manifest.json file does not exist.");
  }
  const manifest = youfile.read.json(manifestPath);
  const cache = new Cache("bedcli");
  const data = dataToCompile(manifest);

  let files;

  switch (data.type) {
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

  files.folders.forEach(async (folderName) => {
    const folderPath = join(packPath, folderName);
    if (fs.pathExistsSync(folderPath)) {
      const filesPath = youfile.read.dir.getAllFiles(folderPath);
      const filesOutputPath = filesPath.map((path) =>
        join(cache.path, path.replace(packPath, ""))
      );
      await copyFiles(filesPath, filesOutputPath);
    }
  });

  (async () => {
    const filesPath = files.files
      .map((path) => {
        const file = join(packPath, path);
        if (fs.pathExistsSync(file)) {
          return file;
        }
      })
      .filter(Boolean);

    const filesOutputPath = filesPath.map((path) => {
      console.log(path);
      console.log(path.replace(packPath, ""));
      return join(cache.path, path.replace(packPath, ""));
    });
    await copyFiles(filesPath, filesOutputPath);
  })();

  const subpacksPath = join(packPath, "subpacks");
  const subpacksCachePath = join(cache.path, "subpacks");

  if (fs.pathExistsSync(subpacksPath) && manifest.subpacks.length > 0) {
    const existingFolders = manifest.subpacks.map(({ folder_name }) => {
      if (fs.pathExistsSync(join(subpacksPath, folder_name))) {
        return folder_name;
      }
    });
    existingFolders.forEach(async (folderName) => {
      const entryPath = join(subpacksPath, folderName);
      const ouputPath = join(subpacksCachePath, folderName);

      const filesPath = youfile.read.dir.getAllFiles(entryPath);
      const filesOutputPath = filesPath.map((path) =>
        join(ouputPath, path.replace(packPath, ""))
      );

      await copyFiles(filesPath, filesOutputPath);
    });
  }

  //
  const langPath = join(packPath, "texts");
  const langCachePath = join(cache.path, "texts");
  if (fs.pathExistsSync(langPath)) {
    lang(langPath, langCachePath);
  }
};
