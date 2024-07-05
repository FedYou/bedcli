import fs from "fs-extra";
import archiver from "archiver";
export default ({ data, dest }) => {
  const output = fs.createWriteStream(dest);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.pipe(output);

  archive.directory(data, false);

  archive.finalize();
};
