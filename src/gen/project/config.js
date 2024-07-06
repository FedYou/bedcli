import { v4 as uuid } from "uuid";
import { PROJECT_TYPES } from "../../utils/enum.js";

export default (answers) => {
  const config = {
    project: {
      type: answers.type,
      name: answers.name.trim(),
      description: answers.description.trim(),
      version: [0, 0, 1],
      minEngineVersion: answers.minEngineVersion,
      authors: [],
    },
    scripts: "",
    build: {
      obfuscator: false,
      external: [],
    },
    output: {},
    uuid: [],
  };
  const PROJECT_TYPE = answers.type;
  // Authors

  if (answers.authors.includes(",")) {
    answers.authors.split(",").forEach((author) => {
      config.project.authors.push(author.trim());
    });
  } else {
    config.project.authors.push(answers.authors.trim());
  }

  // Scripts Api

  if (
    PROJECT_TYPE === PROJECT_TYPES.ADSCR ||
    PROJECT_TYPE === PROJECT_TYPES.SCR
  ) {
    const extnameScript = answers.language == "javascript" ? "js" : "ts";

    let scripts = {
      entry: `scripts/main.${extnameScript}`,
      language: answers.language,
      dependencies: [],
    };

    for (const module in answers.dependencies) {
      scripts.dependencies.push({
        module_name: module,
        version: answers.dependencies[module],
      });
    }
    config.scripts = { ...scripts };
  } else {
    delete config.scripts;
  }

  // Output Project
  const output = {};

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.BP ||
    PROJECT_TYPE === PROJECT_TYPES.SCR ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR
  ) {
    output.behavior = "dist/behavior";
  }
  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.RP ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR
  ) {
    output.resource = "dist/resource";
  }

  config.output = { ...output };

  let uuidAmount = 0;
  // Uuid Amount for types
  if (
    PROJECT_TYPE === PROJECT_TYPES.SCR ||
    PROJECT_TYPE === PROJECT_TYPES.RP ||
    PROJECT_TYPE === PROJECT_TYPES.BP
  ) {
    uuidAmount = 2;
  } else if (PROJECT_TYPE === PROJECT_TYPES.AD) {
    uuidAmount = 4;
  } else if (PROJECT_TYPE === PROJECT_TYPES.ADSCR) {
    uuidAmount = 5;
  }

  for (let x = 0; x < uuidAmount; x++) {
    config.uuid.push(uuid());
  }

  return config;
};
