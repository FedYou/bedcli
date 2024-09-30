import templates from "../../json/templates.json" assert { type: "json" };
import createFiles from "../utils/createFiles.js";
import { PROJECT_TYPES } from "../enum.js";
import path from "path";
import config from "./config.js";

export default (answers) => {
  const { name, type, language } = answers;

  const dirPath = path.resolve(name);
  const folders = {
    resource: path.join(dirPath, "resource"),
    behavior: path.join(dirPath, "behavior"),
  };

  if (
    PROJECT_TYPES.ADD_ON_SCRIPT === type ||
    PROJECT_TYPES.ADD_ON === type ||
    PROJECT_TYPES.RESOURCES === type
  ) {
    createFiles({ dirPath: folders.resource, data: templates.base });
    createFiles({ dirPath: folders.resource, data: templates.resource });
  }

  if (
    PROJECT_TYPES.ADD_ON_SCRIPT === type ||
    PROJECT_TYPES.ADD_ON === type ||
    PROJECT_TYPES.DATA === type
  ) {
    createFiles({ dirPath: folders.behavior, data: templates.base });
  }

  if (PROJECT_TYPES.ADD_ON_SCRIPT === type || PROJECT_TYPES.SCRIPT === type) {
    if (language === "ts") {
      createFiles({ dirPath: folders.behavior, data: templates.script_ts });
    } else if (language === "js") {
      createFiles({ dirPath: folders.behavior, data: templates.script_js });
    }
  }
  const otherFiles = [
    {
      path: "bed.config.json",
      content: config(answers),
    },
  ];
  createFiles({ dirPath, data: otherFiles });
};
