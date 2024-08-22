import fs from "fs-extra";
import console from "../utils/console/index.js";
import { join, basename, dirname } from "path";
import youfile from "youfile";
import { Cache } from "youcache";
import { MANIFEST_TYPES } from "../enum.js";
import dataToCompile from "../utils/manifest/dataToCompile.js";
import compilePath from "../../json/compile.json" assert { type: "json" };
import lang from "./lang.js";
import copyFiles from "./copyFiles.js";
import getFiles from "./getFiles.js";
import subpack from "./subpack.js";

export default async (packPath, json = null) => {
  const cache = new Cache("bedcli");
  const manifestPath = join(packPath, "manifest.json");

  let manifest;
  if (null) {
    manifest = json;
    manifest = youfile.write.json(join(cache.path, "manifest.json", json));
  } else {
    if (!fs.pathExistsSync(manifestPath)) {
      console.error("The manifest.json file does not exist.");
    }
    manifest = youfile.read.json(manifestPath);
  }
  const DATA = dataToCompile(manifest);

  let PATH;

  switch (DATA.type) {
    case MANIFEST_TYPES.RESOURCES:
      PATH = compilePath.resource;
      break;
    case MANIFEST_TYPES.DATA:
    case MANIFEST_TYPES.DATA_SCRIPT:
      PATH = compilePath.behavior;
      break;
    case MANIFEST_TYPES.SCRIPT:
      PATH = compilePath.behavior;
      break;
    case MANIFEST_TYPES.SKIN:
      PATH = compilePath.resource;
      break;
  }

  const filesList = getFiles({ packPath, cachePath: cache.path, path: PATH });

  for (const file of filesList) {
    await copyFiles(file.path, file.output);
  }

  if (
    fs.pathExistsSync(join(packPath, "subpacks")) &&
    manifest.subpacks?.length > 0
  ) {
    await subpack({
      entry: join(packPath, "subpacks"),
      output: join(cache.path, "subpacks"),
      manifest,
      path: PATH,
    });
  }

  //
  const langPath = join(packPath, "texts");
  const langCachePath = join(cache.path, "texts");
  if (fs.pathExistsSync(langPath)) {
    lang(langPath, langCachePath);
  }
};
