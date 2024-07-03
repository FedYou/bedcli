import { PROJECT_TYPES } from "../utils/enum.js";

let PROJECT_TYPE;
const addScriptDependencies = (target, dependencies) => {
  dependencies.forEach((e) => target.push(e));
};

export default (config) => {
  const manifest = {};
  PROJECT_TYPE = config.project.type;
  const BASE = {
    format_version: 2,
    header: {
      description: "pack.description",
      name: "pack.name",
      uuid: "",
      min_engine_version: config.project.minEngineVersion,
      version: config.project.version,
    },
    modules: [],
    dependencies: [],
  };

  if (
    PROJECT_TYPE === PROJECT_TYPES.AD ||
    PROJECT_TYPE === PROJECT_TYPES.ADSCR
  ) {
    //0,1<<resource
    //2,3<<data
    //4<<script
    const rp = JSON.parse(JSON.stringify(BASE));
    const bp = JSON.parse(JSON.stringify(BASE));

    //resources
    rp.header.uuid = config.uuid[0];
    rp.modules.push({
      type: "resources",
      uuid: config.uuid[1],
      version: config.project.version,
    });
    rp.dependencies.push({
      uuid: config.uuid[2],
      version: config.project.version,
    });

    //data
    bp.header.uuid = config.uuid[2];
    bp.modules.push({
      type: "data",
      uuid: config.uuid[3],
      version: config.project.version,
    });
    bp.dependencies.push({
      uuid: config.uuid[0],
      version: config.project.version,
    });

    if (PROJECT_TYPE == PROJECT_TYPES.ADSCR) {
      bp.modules.push({
        type: "script",
        language: config.project.language,
        uuid: config.uuid[4],
        entry: config.scripts.entry,
        version: config.project.version,
      });

      addScriptDependencies(bp.dependencies, config.scripts.dependencies);
    }

    manifest.behavior = bp;
    manifest.resource = rp;
  } else if (PROJECT_TYPE === PROJECT_TYPES.RP) {
    //0,1<<resource
    const rp = JSON.parse(JSON.stringify(BASE));
    rp.header.uuid = config.uuid[0];
    rp.modules.push({
      type: "resources",
      uuid: config.uuid[1],
      version: config.project.version,
    });
    manifest.resource = rp;
  } else if (PROJECT_TYPE === PROJECT_TYPES.BP) {
    //0,1<<data
    const bp = JSON.parse(JSON.stringify(BASE));
    bp.header.uuid = config.uuid[0];
    bp.modules.push({
      type: "data",
      uuid: config.uuid[1],
      version: config.project.version,
    });
    manifest.behavior = bp;
  } else if (PROJECT_TYPE === PROJECT_TYPES.SCR) {
    //0,1<<script
    bp.header.uuid = config.uuid[0];
    bp.modules.push({
      type: "script",
      language: config.project.language,
      uuid: config.uuid[4],
      entry: config.scripts.entry,
      version: config.project.version,
    });
    addScriptDependencies(bp.dependencies, config.scripts.dependencies);

    manifest.behavior = bp;
  }
  return manifest;
};
