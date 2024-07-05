import yfile from "youfile";
import error from "./error.js";
import { PROJECT_TYPES } from "./enum.js";

export default () => {
  try {
    const config = yfile.read.json("bedcli.config.json");
    if (!Object.values(PROJECT_TYPES).includes(config.project.type)) {
      error(`Type of project unknown >>${config.project.type.yellow}<<`);
    }
    return config;
  } catch (e) {
    error('"bedcli.config.json" was not found.');
  }
};
