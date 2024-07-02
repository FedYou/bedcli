import yfile from "youfile";

export default (path, project) => {
  const langFiles = yfile.read.dir.getAllExtnameFiles(path, ".lang");

  langFiles.forEach((pathFile) => {
    let cont = yfile.read.file(pathFile);
    cont = cont
      .replace('"$1', project.name)
      .replace('"$2', project.description);
    yfile.write.file(pathFile, cont);
  });
};
