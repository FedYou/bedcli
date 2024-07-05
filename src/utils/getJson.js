import yfile from "youfile";

export default (entryPath, func) => {
  const files = yfile.read.dir.getAllExtnameFiles(entryPath, ".json");
  files.forEach((pathFile) => func(pathFile));
};
