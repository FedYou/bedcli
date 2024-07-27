import youfile from "youfile";
import "../utils/console/index.js";
import { PROJECT_TYPES } from "./enum.js";

function output(config) {
  if (!config.output.resource) {
    config.output.resource = "dist/resource";
  }
  if (!config.output.behavior) {
    config.output.behavior = "dist/behavior";
  }
  return config;
}

export default () => {
  try {
    let config = youfile.read.json("bedcli.config.json");
    const PROJECT_TYPE = config.project.type;
    if (!Object.values(PROJECT_TYPES).includes(PROJECT_TYPE)) {
      console.new.error(`Type of project unknown >>${PROJECT_TYPE.yellow}<<`);
    }
    output(config);
    return config;
  } catch (e) {
    console.new.error('"bedcli.config.json" was not found.');
  }
};
