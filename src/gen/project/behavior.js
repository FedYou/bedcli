import youfile from "youfile";
import path, { join } from "path";
import templates from "../../templates.js";
import { PROJECT_TYPES } from "../../utils/enum.js";

function addPackage(config, cache) {
  // Template
  const templatePackage = templates.package;
  const packagePath = path.join(cache.path, "package.json");

  config.scripts.dependencies.forEach((item) => {
    const name = item.module_name;
    const version = templatePackage.list[name];
    templatePackage.dependencies[name] = version;
  });

  delete templatePackage.list;
  youfile.write.json(packagePath, templatePackage, 2);
}
function addScript(behaviorPath, config) {
  let path = join(behaviorPath, config.scripts.entry);
  const content = "//Script file main";
  youfile.write.file(path, content);
}

export default (cache, config) => {
  const PROJECT_TYPE = config.project.type;
  const behaviorPath = path.join(cache.path, "BP");

  // >>Template<<
  const templateBehavior = templates.behavior;
  youfile.copy(templateBehavior, behaviorPath);

  // >>If add-on script or script<<
  if (
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    // >>Add package file<<
    addPackage(config, cache);

    // >>Add script file<<
    addScript(behaviorPath, config);
  }
};
