import YCache from "youcache";
import yfile from "youfile";
import { join } from "path";
import esbuild from "../utils/esbuild.js";
import genManifest from "../gen/manifest.js";
import toZip from "../utils/zip.js";
import obuscator from "./obuscator.js";
import copyPath from "./copyPath.js";
import createManifest from "../utils/createManifest.js";
import verifyReadConfig from "../utils/verifyReadConfig.js";
import jsonMinify from "./jsonMinify.js";
import {
  PROJECT_TYPES,
  FOLDERS_BEHAVIOR,
  FOLDERS_RESOURCE,
  FILES_BEHAVIOR,
  FILES_RESOURCE,
  FOLDERS_BEHAVIOR_OBFUSCATOR,
  FOLDERS_RESOURCE_OBFUSCATOR,
} from "../utils/enum.js";

export default () => {
  const cache = new YCache("bedcli");
  const config = verifyReadConfig();
  const manifest = genManifest(config);
  const PROJECT_TYPE = config.project.type;
  const _NAME = (version, text = "") => {
    version = JSON.stringify(version).replace(/,/g, ".");
    if (text) text = "-" + text;

    return `${config.project.name}${version}${text}`;
  };
  const NAME = {
    resource: _NAME(config.project.version, "RP"),
    behavior: _NAME(config.project.version, "BP"),
    file: _NAME(config.project.version),
  };

  const PATH = {
    entry: {
      resource: join(process.cwd(), "RP"),
      behavior: join(process.cwd(), "BP"),
    },
    output: {
      resource: join(config.out.resource, NAME.resource),
      behavior: join(config.out.behavior, NAME.behavior),
      build: "dist/build",
    },
    cache: {
      resource: join(cache.path, NAME.resource),
      behavior: join(cache.path, NAME.behavior),
      build: join(cache.path, "build"),
    },
  };

  let project = {
    resource: {
      path: PATH.entry.resource,
      output: PATH.cache.resource,
    },
    behavior: {
      path: PATH.entry.behavior,
      output: PATH.cache.behavior,
    },
  };

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    createManifest(PATH.cache.resource, manifest.resource);
    copyPath({
      list: FOLDERS_RESOURCE,
      project: project.resource,
    });

    copyPath({
      list: FILES_RESOURCE,
      project: project.resource,
    });
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP
  ) {
    createManifest(PATH.cache.behavior, manifest.behavior);
    copyPath({
      list: FOLDERS_BEHAVIOR,
      project: project.behavior,
    });

    copyPath({
      list: FILES_BEHAVIOR,
      project: project.behavior,
    });
  }
  // Add Script
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    esbuild(
      join(PATH.entry.behavior, config.scripts.entry),
      join(PATH.output.behavior, config.scripts.entry)
    );
  }
  // Minify

  cache.read.dir
    .getAllExtnameFiles("", ".json")
    .forEach((pathFile) => jsonMinify(pathFile));

  // Obuscator

  obuscator(FOLDERS_BEHAVIOR_OBFUSCATOR, PATH.cache.behavior);
  obuscator(FOLDERS_RESOURCE_OBFUSCATOR, PATH.cache.resource);

  // Compress

  yfile.write.dir(PATH.output.build);
  console.clear();
  console.log("~\t Compressing...".bold);

  const ZIP = {
    behavior: join(PATH.output.build, NAME.behavior + ".mcpack"),
    resource: join(PATH.output.build, NAME.resource + ".mcpack"),
  };

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP
  ) {
    toZip({
      data: PATH.cache.behavior,
      dest: ZIP.behavior,
    });
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    toZip({
      data: PATH.cache.resource,
      dest: ZIP.resource,
    });
  }
};
