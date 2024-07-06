import fs from "fs-extra";
import yfile from "youfile";
import { basename, join } from "path";
import { PROJECT_TYPES } from "../utils/enum.js";
import "../utils/console/index.js";

export default (config, cache) => {
  const PROJECT_TYPE = config.project.type;
  config.build.external.forEach((path) => {
    path = join(process.cwd(), path);
    const name = basename(path);

    if (!fs.existsSync(path)) console.new.error(`Path "${name}" was not found`);

    if (
      PROJECT_TYPE === PROJECT_TYPES.AD ||
      PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE === PROJECT_TYPES.SCR ||
      PROJECT_TYPE === PROJECT_TYPES.BP
    ) {
      yfile.copy(path, join(cache.behavior, name));
    }

    if (
      PROJECT_TYPE === PROJECT_TYPES.AD ||
      PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE === PROJECT_TYPES.RP
    ) {
      yfile.copy(path, join(cache.resource, name));
    }
  });
};
