import chokidar from "chokidar";
import process from "process";
import build from "./build.js";
import regExpPath from "../utils/regExpPath.js";
import { BUILD_IGNORED } from "../utils/enum.js";
import verifyReadConfig from "../utils/verifyReadConfig.js";
import message from "./message.js";

const WACTH_DEALY = 500;
let config;
let DEBOUNCE_TIMEOUT = null;

function wacth(path, event) {
  if (DEBOUNCE_TIMEOUT) clearTimeout(DEBOUNCE_TIMEOUT);

  DEBOUNCE_TIMEOUT = setTimeout(() => {
    console.clear();
    message.building(event, path);
    console.time(message.build());
    build(config);
    console.timeEnd(message.build());

    DEBOUNCE_TIMEOUT = null;
  }, WACTH_DEALY);
}

export default () => {
  config = verifyReadConfig();

  const ignored = [...BUILD_IGNORED, config.out.dev];

  const wacthOptions = {
    ignored: regExpPath(ignored),
  };

  const watch = chokidar.watch(process.cwd(), wacthOptions);

  watch.on("all", (event, path) => wacth(path, event));
};
