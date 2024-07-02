export default (config) => {
  const list = {};
  const base = {
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

  if (config.project.type == "ad" || config.project.type == "adscr") {
    //0,1<<resource
    //2,3<<data
    //4<<script
    const rp = JSON.parse(JSON.stringify(base));
    const bp = JSON.parse(JSON.stringify(base));

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

    if (config.project.type == "adscr") {
      bp.modules.push({
        type: "script",
        language: config.project.language,
        uuid: config.uuid[4],
        entry: config.scripts.entry,
        version: config.project.version,
      });

      config.scripts.dependencies.forEach((e) => {
        bp.dependencies.push(e);
      });
    }

    list.behavior = bp;
    list.resource = rp;
  } else if (config.project.type == "rp") {
    //0,1<<resource
    const rp = JSON.parse(JSON.stringify(base));
    rp.header.uuid = config.uuid[0];
    rp.modules.push({
      type: "resources",
      uuid: config.uuid[1],
      version: config.project.version,
    });
    list.resource = rp;
  } else if (config.project.type == "bp") {
    //0,1<<data
    const bp = JSON.parse(JSON.stringify(base));
    bp.header.uuid = config.uuid[0];
    bp.modules.push({
      type: "data",
      uuid: config.uuid[1],
      version: config.project.version,
    });
    list.behavior = bp;
  } else if (config.project.type == "scr") {
    //0,1<<script
    bp.header.uuid = config.uuid[0];
    bp.modules.push({
      type: "script",
      language: config.project.language,
      uuid: config.uuid[4],
      entry: config.scripts.entry,
      version: config.project.version,
    });

    config.scripts.dependencies.forEach((e) => {
      bp.dependencies.push(e);
    });
    list.behavior = bp;
  }

  return list;
};
