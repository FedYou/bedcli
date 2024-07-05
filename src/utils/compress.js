import fs from "fs-extra";
import archiver from "archiver";
export default (path, dest) => {
  const output = fs.createWriteStream(dest);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.pipe(output);

  archive.directory(path, false);

  archive.finalize();
};
