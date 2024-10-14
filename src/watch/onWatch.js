import console from "../utils/console/index.js";
import { join } from "path";
import { EVENTS_NAME } from "../enum.js";
import debouncedCopy from "./debouncedCopy.js";

export default ({ folders, event, path, mojang, config }) => {
  let folderOuput;
  let name;

  if (path.startsWith("behavior/")) {
    folderOuput = join(
      mojang,
      "development_behavior_packs",
      config.project.name
    );
    name = "behavior";
  } else if (path.startsWith("resource/")) {
    folderOuput = join(
      mojang,
      "development_resource_packs",
      config.project.name
    );
    name = "resource";
  }

  const filePathRelative = path.replace(name, "");
  const output = join(folderOuput, filePathRelative);

  const onEnd = (time) => {
    console.log(
      "~~".bold.dim,
      EVENTS_NAME[event].red.bold,
      path.dim.italic,
      time.dim.italic
    );
  };

  debouncedCopy(event, path, output, onEnd);
};
