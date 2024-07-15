import youfile from "youfile";

function changeName(pathFile, project) {
  let contentFile = youfile.read.file(pathFile);
  contentFile = contentFile
    .replace('"$1', project.name)
    .replace('"$2', project.description || project.name);
  youfile.write.file(pathFile, contentFile);
}

export default (path, project) => {
  const langFiles = youfile.read.dir.getAllExtnameFiles(path, ".lang");
  langFiles.forEach((pathFile) => changeName(pathFile, project));
};
