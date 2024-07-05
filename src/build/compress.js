import fs from "fs-extra";
import yfile from "youfile";
import { join } from "path";
import zip from "../utils/zip.js";
import { PROJECT_TYPES } from "../utils/enum.js";
export default (PATH, NAME, PROJECT_TYPE) => {
  yfile.write.dir(PATH.output.build);

  console.log("~ Compressing...".bold);

  const ZIP = {
    behavior: join(PATH.output.build, NAME.behavior + ".mcpack"),
    resource: join(PATH.output.build, NAME.resource + ".mcpack"),
  };

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP
  ) {
    zip({
      data: PATH.cache.behavior,
      dest: ZIP.behavior,
    });
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    zip({
      data: PATH.cache.resource,
      dest: ZIP.resource,
    });
  }
  process.on("exit", () => {
    console.log("~ Finalized.".green.bold);
  });
};
