import { v4 as uuid } from "uuid";
export default (answers) => {
  const config = {
    project: {
      name: answers.name.trim(),
      description: answers.description.trim(),
      version: [0, 0, 1],
      minEngineVersion: answers.minEngineVersion,
      author: answers.author.trim(),
    },
    scripts: "",
    out: {
      dev: "dist/dev",
      production: "dist/product",
    },
    uuid: [],
  };
  let uuidAmount = 0;

  if (answers.type == "ad") {
    uuidAmount = 4;
  } else if (answers.type == "adscr") {
    uuidAmount = 5;
  } else if (
    answers.type == "scr" ||
    answers.type == "rp" ||
    answers.type == "bp"
  ) {
    uuidAmount = 2;
  }
  if (answers.type == "scr" || answers.type == "adscr") {
    let scripts = {
      language: answers.language,
      dependencies: [],
    };

    for (const module in answers.dependencies) {
      scripts.dependencies.push({
        module: module,
        version: answers.dependencies[module],
      });
    }
    config.scripts = scripts;
  } else {
    delete config.scripts;
  }
  for (let x = 0; x < uuidAmount; x++) {
    config.uuid.push(uuid());
  }
  return config;
};
