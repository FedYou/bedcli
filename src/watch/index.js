import chokidar from "chokidar";
import yfile from "youfile";
import build from "../build/index.js";

export default () => {
  let loadConfig;
  let building;
  let config;
  try {
    config = yfile.read.json("bedcli.config.json");
    loadConfig = true;
  } catch (error) {
    loadConfig = false;
    console.log(
      "Error".bgRed.bold,
      '\n\t "bedcli.config.json" was not found.'.bold
    );
  }

  if (loadConfig) {
    const watch = chokidar.watch(process.cwd(), { ignored: ["dist"] });

    watch.on("all", async (event, path) => {
      if (!building) {
        building = true;
        await build(config);
        building = false;
      }
    });
  }
};
