import path from "path";
import genManifest from "../gen/manifest.js";
import esbuild from "../utils/esbuild.js";
import symlinkFromList from "./symlinkFromList.js";
import createManifest from "../utils/createManifest.js";
import {
  PROJECT_TYPES,
  FOLDERS_BEHAVIOR,
  FOLDERS_RESOURCE,
  FILES_BEHAVIOR,
  FILES_RESOURCE,
} from "../utils/enum.js";

export default async (config) => {
  const PROJECT_TYPE = config.project.type;
  const manifest = genManifest(config);

  const PATH = {
    entry: {
      resource: path.join(process.cwd(), "RP"),
      behavior: path.join(process.cwd(), "BP"),
    },
    output: {
      resource: path.join(config.output.resource, "RP"),
      behavior: path.join(config.output.behavior, "BP"),
    },
  };

  // Add Resource
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    createManifest(PATH.output.resource, manifest.resource);
    // Folders
    symlinkFromList({
      list: FOLDERS_RESOURCE,
      project: {
        path: PATH.entry.resource,
        output: PATH.output.resource,
      },
    });
    // Files
    symlinkFromList({
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
    symlinkFromList({
      list: FOLDERS_BEHAVIOR,
      project: {
        path: PATH.entry.behavior,
        output: PATH.output.behavior,
      },
    });
    // Files
    symlinkFromList({
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
    esbuild(
      path.join(PATH.entry.behavior, config.scripts.entry),
      path.join(PATH.output.resource, config.scripts.entry)
    );
  }
};
