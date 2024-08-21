import { Command } from "commander";
import __dirname from "../__dirname.js";
import youfile from "youfile";
import { join } from "path";
import pack from "./commands/pack.js";
const program = new Command();
const packAge = youfile.read.json(join(__dirname, "package.json"));
const version = packAge.version;
const description = packAge.description;
program.version(version).description(description);

program
  .command("create")
  .description("Create a new project")
  .action(() => {});
program
  .command("build")
  .description("Package your project")
  .action(() => {});
program
  .command("watch")
  .description("Every time there are changes, pack your project for testing.")
  .action(() => {});

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
  .option(
    "--obfuscator",
    "Obfuscates your package, but makes your package heavier."
  )
  .action((options) => {
    pack(options.path);
  });
program.parse(process.argv);
