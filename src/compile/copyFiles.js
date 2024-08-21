import youfile from "youfile";

const MAX_CONCURRENT_OPERATIONS = 100;

async function processFile(path, outputPath) {
  if (outputPath.endsWith(".json")) {
    youfile.write.json(outputPath, youfile.read.json5(path));
  } else {
    youfile.copy(path, outputPath);
  }
}

export default async (filesPath, filesOutputPath) => {
  let index = 0;

  async function processBatch() {
    const promises = [];
    for (
      let i = 0;
      i < MAX_CONCURRENT_OPERATIONS && index < filesPath.length;
      i++, index++
    ) {
      promises.push(processFile(filesPath[index], filesOutputPath[index]));
    }
    await Promise.all(promises);
  }

  const batchPromises = [];
  while (index < filesPath.length) {
    batchPromises.push(processBatch());
  }
  await Promise.all(batchPromises);
};
