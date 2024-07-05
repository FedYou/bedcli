import yfile from "youfile";
import { basename, join } from "path";
import templates from "../../../templates/index.js";
import getJson from "../../utils/getJson.js";

function changeName(path, name) {
  const fileName = basename(path);
  if (fileName === "item_texture.json" || fileName === "terrain_texture.json") {
    const content = yfile.read.json(path);
    content.resource_pack_name = name;
    yfile.write.json(path, content, 2);
  }
}

export default (cache, config) => {
  const resourcePath = join(cache.path, "RP");
  // >>Template<<
  const templateResource = templates.resource;

  yfile.copy(templateResource, resourcePath);

  /// >>Change resource_pack_name<<
  getJson(resourcePath, (pathFile) => {
    changeName(pathFile, config.project.name);
  });
};
