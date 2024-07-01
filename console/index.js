import create from "./create.js";
import help from "./help.js";
const argv = process.argv.slice(2);

export default () => {
  if (argv[0] == "create") {
    create();
  } else if (argv[0] == "build") {
  } else if (argv[0] == "watch") {
  } else if (argv[0] == "help" || argv[0] == "" || argv[0] == undefined) {
    help();
  }
};
