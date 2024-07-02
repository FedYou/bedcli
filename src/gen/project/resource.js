import yfile from "youfile";
import path from "path";
import templates from "../../../templates/index.js";

const templ = templates.resource;

export default (cache, config) => {
  ///template
  const resource = path.join(cache.path, "RP");

  yfile.copy(templ, resource);

  ///resource_pack_name
  const files = yfile.read.dir.getAllExtnameFiles(resource, ".json");
  files.forEach((pathFile) => {
    if (
      pathFile.endsWith("item_texture.json") ||
      pathFile.endsWith("terrain_texture.json")
    ) {
      let cont = yfile.read.json(pathFile);
      cont.resource_pack_name = config.project.name;
      yfile.write.json(pathFile, cont, 2);
    }
  });
};
