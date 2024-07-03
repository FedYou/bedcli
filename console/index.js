import create from "./create.js";
import help from "./help.js";
import genProject from "../src/gen/project/index.js";
import wacth from "../src/watch/index.js";
const argv = process.argv.slice(2);

export default async () => {
  if (argv[0] == "create") {
    genProject(await create());
  } else if (argv[0] == "build") {
  } else if (argv[0] == "watch") {
    wacth();
  } else if (argv[0] == "help" || argv[0] == "" || argv[0] == undefined) {
    help();
  }
};
