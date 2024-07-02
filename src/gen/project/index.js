import "colors";
import fs from "fs-extra";
import yfile from "youfile";
import YCache from "youcache";
import path from "path";
import __dirname from "../../../__dirname.js";
import config from "./config.js";

export default (answers) => {
  if (!fs.pathExistsSync(answers.name.trim())) {
    let projectPath = path.join(process.cwd(), answers.name.trim());

    let cacheProject = new YCache(answers.name.trim());
    const configPath = "ybed.config.json";
    const configData = config(answers);

    cacheProject.write.json(configPath, configData, 2);

    if (
      answers.type == "ad" ||
      answers.type == "adscr" ||
      answers.type == "rp"
    ) {
      const rpPath = path.join(__dirname, "/templates/rp");
      const rpDest = path.join(cacheProject.path, "RP");
      yfile.copy(rpPath, rpDest);

      const files = yfile.read.dir.getAllExtnameFiles(rpDest, ".json");

      files.forEach((e) => {
        if (
          e.endsWith("item_texture.json") ||
          e.endsWith("terrain_texture.json")
        ) {
          let content = yfile.read.json(e);
          content.resource_pack_name = configData.project.name;
          yfile.write.json(e, content, 2);
        }
      });
    }
    if (
      answers.type == "ad" ||
      answers.type == "adscr" ||
      answers.type == "bp"
    ) {
      const bpPath = path.join(__dirname, "/templates/bp");
      const bpDest = path.join(cacheProject.path, "BP");
      yfile.copy(bpPath, bpDest);
    }
    if (answers.type == "adscr" || answers.type == "scr") {
      const filePath = path.join(
        cacheProject.path,
        `BP/scripts/main.${configData.scripts.language}`
      );
      yfile.write.file(filePath, "//Script File main");
    }

    const langFiles = yfile.read.dir.getAllExtnameFiles(
      cacheProject.path,
      ".lang"
    );

    langFiles.forEach((e) => {
      let content = yfile.read.file(e);
      content = content.replace('"$1', configData.project.name);
      content = content.replace('"$2', configData.project.description);
      yfile.write.file(e, content);
    });

    yfile.copy(cacheProject.path, projectPath);
    console.log("~Project successfully created".yellow.bold);
  } else {
    console.log("~A folder with the same name already exists".red.bold);
  }
};
