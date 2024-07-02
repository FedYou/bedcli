import "colors";
import fs from "fs-extra";
import yfile from "youfile";
import path from "path";
import __dirname from "../../../__dirname.js";
import config from "./config.js";

export default (answers) => {
  if (!fs.pathExistsSync(answers.name.trim())) {
    let projectPath = path.join(process.cwd(), answers.name.trim());
    let configPath = path.join(projectPath, "ybed.config.json");
    let configData = config(answers);

    yfile.write.json(configPath, configData, 2);

    console.log("~Project successfully created".yellow.bold);
  } else {
    console.log("~A folder with the same name already exists".red.bold);
  }
};
