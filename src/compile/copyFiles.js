import youfile from "youfile";
import sharp from "sharp";
import { dirname } from "path";
import json from "./json.js";

async function processFile(path, outputPath) {
  if (path.endsWith(".json")) {
    await json(path, outputPath);
  } else if (path.endsWith(".png")) {
    youfile.write.dir(dirname(outputPath));
    await sharp(path)
      .png({
        compressionLevel: 9,
        quality: 100,
      })
      .toFile(outputPath);
  } else {
    youfile.copy(path, outputPath);
  }
}
export default async (filesPath, filesOutputPath) => {
  const promises = [];
  for (let x = 0; x < filesPath.length; x++) {
    promises.push(processFile(filesPath[x], filesOutputPath[x]));
  }
  await Promise.all(promises);
};
