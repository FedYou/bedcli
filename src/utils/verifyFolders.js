import fs from "fs-extra";
import "./console/index.js";
import { PROJECT_TYPES } from "./enum.js";

export default (config) => {
  const PROJECT_TYPE = config.project.type;
  if (
    PROJECT_TYPE === PROJECT_TYPES.BP ||
    PROJECT_TYPE === PROJECT_TYPES.SCR ||
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR
  ) {
    if (!fs.existsSync("BP")) {
      console.new.error('"BP" folder not found.');
    }
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.RP ||
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR
  ) {
    if (!fs.existsSync("RP")) {
      console.new.error('"RP" folder not found.');
    }
  }
};
