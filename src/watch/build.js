import fs from "fs-extra";
import { join } from "path";
import genManifest from "../gen/manifest.js";
import esbuild from "../utils/esbuild.js";
import copyList from "./copyList.js";
import createManifest from "../utils/createManifest.js";
import existRemove from "../utils/existRemove.js";
import {
  PROJECT_TYPES,
  FOLDERS_BEHAVIOR,
  FOLDERS_RESOURCE,
  FILES_BEHAVIOR,
  FILES_RESOURCE,
} from "../utils/enum.js";
import scripts from "./scripts.js";

export default async (config) => {
  const PROJECT_TYPE = config.project.type;
  const manifest = genManifest(config);
  const EXT = {
    resource: "-RP",
    behavior: "-BP",
  };
  if (PROJECT_TYPE === PROJECT_TYPES.RP) {
    EXT.resource = "";
  }
  if (PROJECT_TYPE === PROJECT_TYPES.BP) {
    EXT.behavior = "";
  }
  const PATH = {
    entry: {
      resource: join(process.cwd(), "RP"),
      behavior: join(process.cwd(), "BP"),
    },
    output: {
      resource: join(
        config.output.resource,
        config.project.name + EXT.resource
      ),
      behavior: join(
        config.output.behavior,
        config.project.name + EXT.behavior
      ),
    },
  };
  existRemove(PATH.output.behavior);
  existRemove(PATH.output.resource);
  // Add Resource
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    createManifest(PATH.output.resource, manifest.resource);
    // Folders
    copyList({
      list: FOLDERS_RESOURCE,
      project: {
        path: PATH.entry.resource,
        output: PATH.output.resource,
      },
    });
    // Files
    copyList({
      list: FILES_RESOURCE,
      project: {
        path: PATH.entry.resource,
        output: PATH.output.resource,
      },
    });
  }
  // Add Behavior
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    createManifest(PATH.output.behavior, manifest.behavior);
    // Folders
    copyList({
      list: FOLDERS_BEHAVIOR,
      project: {
        path: PATH.entry.behavior,
        output: PATH.output.behavior,
      },
    });
    // Files
    copyList({
      list: FILES_BEHAVIOR,
      project: {
        path: PATH.entry.behavior,
        output: PATH.output.behavior,
      },
    });
  }
  // Add Script
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    scripts(config, PATH);
  }
};
