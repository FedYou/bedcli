import { join } from "path";
import youfile from "youfile";
import manifestGen from "../gen/manifest.js";

function copyFile(file, output) {
  youfile.copy(file, output);
}

export default ({ config, mojang, folders }) => {
  const manfest = manifestGen(config);
  const _manifest = "manifest.json";
  const fileList = [];

  for (const folder of folders) {
    let folderOuput;
    if (folder === "behavior") {
      folderOuput = join(
        mojang,
        "development_behavior_packs",
        config.project.name
      );
    } else if (folder === "resource") {
      folderOuput = join(
        mojang,
        "development_resource_packs",
        config.project.name
      );
    }

    youfile.remove(folderOuput);
    youfile.write.json(join(folderOuput, _manifest), manfest[folder]);

    youfile.read.dir.getAllFiles(folder).forEach((file) => {
      const filePathRelative = file.replace(folder, "");
      const output = join(folderOuput, filePathRelative);

      fileList.push({
        file,
        output,
      });
    });
  }

  for (let x = 0; x < fileList.length; x++) {
    copyFile(fileList[x].file, fileList[x].output);
  }
};
