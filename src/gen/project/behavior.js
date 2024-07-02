import yfile from "youfile";
import path from "path";
import templates from "../../../templates/index.js";

const templBp = templates.behavior;
const tempPack = templates.package;

export default (cache, config) => {
  //template
  const behavior = path.join(cache.path, "BP");
  yfile.copy(templBp, behavior);

  //script
  if (config.project.type == "scr" || config.project.type == "adscr") {
    let scriptPath = `scripts/main.${config.scripts.language}`;
    scriptPath = path.join(behavior, scriptPath);
    const contScript = "//Script file main";
    yfile.write.file(scriptPath, contScript);

    // Package
    const packagePath = path.join(cache.path, "package.json");
    config.scripts.dependencies.forEach((e) => {
      tempPack.dependencies[e.module] = tempPack.list[e.module];
    });

    delete tempPack.list;

    yfile.write.json(packagePath, tempPack, 2);
  }
};
