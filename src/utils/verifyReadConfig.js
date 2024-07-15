import youfile from "youfile";
import "../utils/console/index.js";
import { PROJECT_TYPES } from "./enum.js";

export default () => {
  try {
    const config = youfile.read.json("bedcli.config.json");
    const PROJECT_TYPE = config.project.type;
    if (!Object.values(PROJECT_TYPES).includes(PROJECT_TYPE)) {
      console.new.error(`Type of project unknown >>${PROJECT_TYPE.yellow}<<`);
    }
    return config;
  } catch (e) {
    console.new.error('"bedcli.config.json" was not found.');
  }
};
