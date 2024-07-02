import create from "./create.js";
import help from "./help.js";
import gen from "../src/gen/index.js";
const argv = process.argv.slice(2);

export default async () => {
  if (argv[0] == "create") {
    gen.project(await create());
  } else if (argv[0] == "build") {
  } else if (argv[0] == "watch") {
  } else if (argv[0] == "help" || argv[0] == "" || argv[0] == undefined) {
    help();
  }
};
