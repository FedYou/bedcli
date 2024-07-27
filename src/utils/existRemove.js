import fs from "fs-extra";
import youfile from "youfile";

export default (path) => {
  if (fs.pathExistsSync(path)) youfile.remove(path);
};
