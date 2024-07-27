import chokidar from "chokidar";
import build from "./build.js";
import regExpPath from "../utils/regExpPath.js";
import { BUILD_IGNORED } from "../utils/enum.js";
import verifyReadConfig from "../utils/verifyReadConfig.js";
import verifyFolders from "../utils/verifyFolders.js";
import "../utils/console/index.js";
import { join } from "path";
import wacth from "./wacth.js";

let CONFIG;

function initialize() {
  console.clear();
  build(CONFIG);
  console.new.check("Build done correctly.".green);
}

export default () => {
  CONFIG = verifyReadConfig();
  verifyFolders(CONFIG);
  const ignored = [
    ...BUILD_IGNORED,
    CONFIG.output.behavior,
    CONFIG.output.resource,
  ];

  const wacthOptions = {
    ignored: regExpPath(ignored),
    ignoreInitial: true,
  };
  initialize();

  /// chokidar
  const FOLDERS_WATCH = [join(process.cwd(), "RP"), join(process.cwd(), "BP")];

  const watch = chokidar.watch(FOLDERS_WATCH, wacthOptions);
  watch.on("all", (event, path) => wacth(CONFIG, path, event));
};
