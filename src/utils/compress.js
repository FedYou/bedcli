// import fs from "fs-extra";
// import JSZip from "jszip";
// import { join } from "path";

// export default async (folderPath, outPath) => {
//   const zip = new JSZip();

//   async function addFiles(dir, zipDir) {
//     const files = fs.readdirSync(dir);
//     for (const file of files) {
//       const fullPath = join(dir, file);
//       const stat = fs.statSync(fullPath);
//       if (stat.isDirectory()) {
//         const newZipDir = zipDir.folder(file);
//         await addFiles(fullPath, newZipDir);
//       } else {
//         const fileData = await fs.readFile(fullPath);
//         zipDir.file(file, fileData);
//       }
//     }
//   }

//   await addFiles(folderPath, zip);

//   const content = await zip.generateAsync({ type: "nodebuffer" });

//   await fs.writeFile(outPath, content);
// };
import AdmZip from "adm-zip";
export default (path, dest) => {
  const zip = new AdmZip();
  zip.addLocalFolder(path);
  zip.writeZip(dest);
};
