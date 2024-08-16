import getType from "./type.js";
export default (manifest) => {
  const type = getType(manifest);
  const name = manifest.header.name;
  const version = manifest.header.version.join(",");
  return {
    type,
    name,
    version,
  };
};
