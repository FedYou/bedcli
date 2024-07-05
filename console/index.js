import create from "./create.js";
import help from "./help.js";
import genProject from "../src/gen/project/index.js";
import wacth from "../src/watch/index.js";
import build from "../src/build/index.js";
const argv = process.argv.slice(2);

export default async () => {
  switch (argv[0]) {
    case "create":
      genProject(await create());
      break;
    case "build":
      build();
      break;
    case "watch":
      wacth();
      break;
    default:
      help();
      break;
  }
};
