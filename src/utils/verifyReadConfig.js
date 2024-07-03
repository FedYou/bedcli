import yfile from "youfile";
import error from "./error.js";

export default () => {
  try {
    return yfile.read.json("bedcli.config.json");
  } catch (e) {
    error('"bedcli.config.json" was not found.');
  }
};
