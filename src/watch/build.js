import fs from "fs-extra";
import { join } from "path";
import youfile from "youfile";
import manifestGen from "../gen/manifest.js";
import dataToCompile from "../utils/manifest/dataToCompile.js";
import esbuild from "../utils/esbuild.js";

function copyFile(file, output) {
  youfile.copy(file, output);
}

export default ({ config, mojang, folders }) => {
  const manifest = manifestGen(config);
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

      manifest.behavior = dataToCompile(manifest.behavior).typeScript.manifest;

      esbuild(
        join("behavior", config.scripts.entry),
        join(folderOuput, "scripts/main.js")
      );
    } else if (folder === "resource") {
      folderOuput = join(
        mojang,
        "development_resource_packs",
        config.project.name
      );
    }

    if (fs.pathExistsSync(folderOuput)) {
      youfile.remove(folderOuput);
    }
    youfile.write.json(join(folderOuput, _manifest), manifest[folder]);

    youfile.read.dir.getAllFiles(folder).forEach((file) => {
      const filePathRelative = file.replace(folder, "");
      const output = join(folderOuput, filePathRelative);

      fileList.push({
        file,
        output,
      });
    });
  }

  const filteredList = fileList.filter(
    (e) => !e.file.startsWith("behavior/scripts")
  );

  for (let x = 0; x < filteredList.length; x++) {
    copyFile(filteredList[x].file, filteredList[x].output);
  }
};
