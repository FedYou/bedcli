import chokidar from "chokidar";
import process from "process";
import build from "./build.js";
import regExpPath from "../utils/regExpPath.js";
import { BUILD_IGNORED } from "../utils/enum.js";
import verifyReadConfig from "../utils/verifyReadConfig.js";
import verifyFolders from "../utils/verifyFolders.js";
import "../utils/console/index.js";
const WACTH_DEALY = 500;
let CONFIG;
let DEBOUNCE_TIMEOUT = null;

function wacth(path, event) {
  if (DEBOUNCE_TIMEOUT) clearTimeout(DEBOUNCE_TIMEOUT);

  DEBOUNCE_TIMEOUT = setTimeout(() => {
    console.clear();
    console.new.waitPath(`There was a ${event.yellow} in the path`, path);
    build(CONFIG);
    console.new.check("Build done correctly.".green);
    DEBOUNCE_TIMEOUT = null;
  }, WACTH_DEALY);
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
  };

  const watch = chokidar.watch(process.cwd(), wacthOptions);

  watch.on("all", (event, path) => wacth(path, event));
};
