import fs from "fs-extra";
import youfile from "youfile";
import "./console/index.js";
import { PROJECT_TYPES } from "../enum.js";
import console from "./console/index.js";

export default () => {
  const path = "bed.config.json";
  if (!fs.pathExistsSync(path)) {
    console.error("The bed.config.json file does not exist.");
  }

  let config = youfile.read.json(path);
  const PROJECT_TYPE = config.project.type;
  if (!Object.values(PROJECT_TYPES).includes(PROJECT_TYPE)) {
    console.error(`Type of project unknown >>${PROJECT_TYPE.yellow}<<`);
  }
  return config;
};
