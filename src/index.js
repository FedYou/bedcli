import create from "../commands/create.js";
import help from "../commands/help.js";
import generateProject from "./gen/project/index.js";
import wacth from "./watch/index.js";
import build from "./build/index.js";
const argv = process.argv.slice(2);

export default async () => {
  switch (argv[0]) {
    case "create":
      generateProject(await create());
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
