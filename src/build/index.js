import yfile from "youfile";
import YCache from "youcache";
import compress from "../utils/compress.js";
import { join } from "path";
import esbuild from "../utils/esbuild.js";
import generateManifest from "../gen/manifest.js";
import createManifest from "../utils/createManifest.js";
import verifyReadConfig from "../utils/verifyReadConfig.js";
import verifyFolders from "../utils/verifyFolders.js";
import copyPath from "./copyPath.js";
import obfuscator from "./obfuscator.js";
import minify from "./minify.js";
import "../utils/console/index.js";
import {
  PROJECT_TYPES,
  FOLDERS_BEHAVIOR,
  FOLDERS_RESOURCE,
  FILES_BEHAVIOR,
  FILES_RESOURCE,
  FOLDERS_BEHAVIOR_OBFUSCATOR,
  FOLDERS_RESOURCE_OBFUSCATOR,
} from "../utils/enum.js";
import external from "./external.js";
import fs from "fs-extra";

export default () => {
  const cache = new YCache("bedcli");
  const config = verifyReadConfig();
  verifyFolders(config);
  const manifest = generateManifest(config);
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
      resource: join(config.output.resource || "dist/resource", NAME.resource),
      behavior: join(config.output.behavior || "dist/behavior", NAME.behavior),
      build: join(process.cwd(), "dist"),
    },
    cache: {
      resource: join(cache.path, NAME.resource),
      behavior: join(cache.path, NAME.behavior),
    },
  };
  PATH.zip = {
    behavior: join(PATH.output.build, NAME.behavior + ".mcpack"),
    resource: join(PATH.output.build, NAME.resource + ".mcpack"),
  };
  const project = {
    resource: {
      path: PATH.entry.resource,
      output: PATH.cache.resource,
    },
    behavior: {
      path: PATH.entry.behavior,
      output: PATH.cache.behavior,
    },
  };

  // <<Add resource manifest.json and folders>>
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    console.new.line("Resource");
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
  // <<Add behavior manifest.json and folders>>
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP
  ) {
    console.new.line("Behavior");
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
  // <<Add the main.js file if it is add-on script or script type>>
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    const language = config.scripts.language;
    if (language !== "javascript") {
      console.new.error(`Error the language "${language}" is not supported`);
    }
    const entry = join(PATH.entry.behavior, config.scripts.entry);
    const output = join(PATH.cache.behavior, config.scripts.entry);
    if (!fs.existsSync(entry))
      console.new.error(`The file "${entry}" does not exist`);
    esbuild(entry, output);
  }
  // <<Add external files or folders>>
  external(config, PATH.cache);
  // <<Minify all json files>>
  console.new.line("Minify");
  minify(cache.path);

  // <<Obfuscator of json files in a specific folder>>
  if (config.build.obfuscator === true) {
    console.new.line("Obfuscator");
    obfuscator(FOLDERS_BEHAVIOR_OBFUSCATOR, PATH.cache.behavior);
    obfuscator(FOLDERS_RESOURCE_OBFUSCATOR, PATH.cache.resource);
  }

  //
  // <<Compression of the project to .mcpack>>
  //
  console.new.line("Compress");

  yfile.write.dir(PATH.output.build);

  try {
    if (
      PROJECT_TYPE === PROJECT_TYPES.AD ||
      PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE === PROJECT_TYPES.SCR ||
      PROJECT_TYPE === PROJECT_TYPES.BP
    ) {
      compress(PATH.cache.behavior, PATH.zip.behavior);
    }
    if (
      PROJECT_TYPE === PROJECT_TYPES.AD ||
      PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE === PROJECT_TYPES.RP
    ) {
      compress(PATH.cache.resource, PATH.zip.resource);
    }
    process.on("exit", () => console.new.check("Finalized.".green));
  } catch (err) {
    console.new.error("There was an error in the compression.");
  }
};
