import youfile from "youfile";

export default (entryPath, func) => {
  const files = youfile.read.dir.getAllExtnameFiles(entryPath, ".json");
  files.forEach((pathFile) => func(pathFile));
};
