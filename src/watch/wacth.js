import youfile from "youfile";
import { join } from "path";
import existRemove from "../utils/existRemove.js";
import { EVENTS, PROJECT_TYPES } from "../utils/enum.js";
import "../utils/console/index.js";

let PATH;
function relativePath(path, output) {
  let relative = path.replace(process.cwd() + "/", "").split("/");
  relative[0] = "";
  relative = relative.join("/");
  return join(output, relative);
}

export default (config, path, event) => {
  const PROJECT_TYPE = config.project.type;
  const EXT = {
    resource: "-RP",
    behavior: "-BP",
  };
  if (PROJECT_TYPE === PROJECT_TYPES.RP) {
    EXT.resource = "";
  }
  if (PROJECT_TYPE === PROJECT_TYPES.BP) {
    EXT.behavior = "";
  }
  PATH = {
    entry: {
      resource: join(process.cwd(), "RP"),
      behavior: join(process.cwd(), "BP"),
    },
    output: {
      resource: join(
        config.output.resource,
        config.project.name + EXT.resource
      ),
      behavior: join(
        config.output.behavior,
        config.project.name + EXT.behavior
      ),
    },
  };
  let dest;

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP
  ) {
    dest = relativePath(path, PATH.output.resource);
  } else if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.BP ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    dest = relativePath(path, PATH.output.behavior);
  }

  if (EVENTS.REMOVE === event || EVENTS.REMOVE_DIR === event) {
    existRemove(dest);
  }
  if (EVENTS.ADD_DIR === event) {
    youfile.write.dir(dest);
  } else if (EVENTS.ADD === event || EVENTS.CHANGE === event) {
    youfile.copy(path, dest);
  }
  console.new.waitPath(`There was a ${event.yellow} in the path `, path.red);
};
