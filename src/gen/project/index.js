import "colors";
import fs from "fs-extra";
import yfile from "youfile";
import YCache from "youcache";
import { join } from "path";
import lang from "./lang.js";
import generateConfig from "./config.js";
import generateResource from "./resource.js";
import generateBehavior from "./behavior.js";
import { PROJECT_TYPES } from "../../utils/enum.js";
import "../../utils/console/index.js";
export default (answers) => {
  const PROJECT_TYPE = answers.type;
  const PROJECT_NAME = answers.name.trim();
  if (!fs.pathExistsSync(PROJECT_NAME)) {
    let projectPath = join(process.cwd(), PROJECT_NAME);
    let cacheProject = new YCache(PROJECT_NAME);

    const configPath = "bedcli.config.json";
    const configData = generateConfig(answers);

    cacheProject.write.json(configPath, configData, 2);

    if (
      PROJECT_TYPE == PROJECT_TYPES.AD ||
      PROJECT_TYPE == PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE == PROJECT_TYPES.RP
    ) {
      generateResource(cacheProject, configData);
    }
    if (
      PROJECT_TYPE == PROJECT_TYPES.AD ||
      PROJECT_TYPE == PROJECT_TYPES.ADSCR ||
      PROJECT_TYPE == PROJECT_TYPES.BP ||
      PROJECT_TYPE == PROJECT_TYPES.SCR
    ) {
      generateBehavior(cacheProject, configData);
    }

    lang(cacheProject.path, configData.project);

    yfile.copy(cacheProject.path, projectPath);

    // Message
    console.new.check("Project successfully created".yellow);
    console.new.item(`cd ${configData.project.name}/`);

    if (
      PROJECT_TYPE == PROJECT_TYPES.SCR ||
      PROJECT_TYPE == PROJECT_TYPES.ADSCR
    ) {
      console.new.item("npm install");
      console.new.item("pnpm install");
    }
  } else {
    console.new.error("A folder with the same name already exists");
  }
};
