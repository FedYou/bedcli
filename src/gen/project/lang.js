import yfile from "youfile";

function changeName(pathFile, project) {
  let contentFile = yfile.read.file(pathFile);
  contentFile = contentFile
    .replace('"$1', project.name)
    .replace('"$2', project.description);
  yfile.write.file(pathFile, contentFile);
}

export default (path, project) => {
  const langFiles = yfile.read.dir.getAllExtnameFiles(path, ".lang");
  langFiles.forEach((pathFile) => changeName(pathFile, project));
};
