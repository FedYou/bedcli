import { Command } from "commander";
import packAge from "../package.json" assert { type: "json" };
import pack from "./commands/pack.js";
import create from "./commands/create.js";
import build from "./build/index.js";
import config from "./commands/config.js";
import watch from "./watch/index.js";
import info from "./commands/info.js";
const program = new Command();
const version = packAge.version;
const description = packAge.description;
program.version(version).description(description);
program
  .command("config")
  .description("Edit the configuration file")
  .option("--com.mojang <path>", "Path of the mojang folder", null)
  .option("--info", "Show configuration info")
  .action((options, cmd) => {
    if (options.info) {
      info();
      return;
    }
    if (null === options["com.mojang"]) {
      cmd.outputHelp();
      return;
    }
    config(options["com.mojang"]);
  });
program
  .command("create")
  .description("Create a new project")
  .action(() => {
    create();
  });
program
  .command("build")
  .description("Package your project")
  .action(() => {
    build();
  });
program
  .command("watch")
  .description("Every time there are changes, pack your project for testing.")
  .action(() => {
    watch();
  });

program
  .command("pack")
  .description(
    "Pack your resource or behavior pack without being a bedcli project."
  )
  .option(
    "--path <path>",
    "Path of your project folder can be relative as obsolete",
    "./"
  )
  .action((options) => {
    pack(options.path);
  });
program.parse(process.argv);
