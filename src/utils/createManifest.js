import youfile from "youfile";
import { join } from "path";
export default (output, content) => {
  youfile.write.json(join(output, "manifest.json"), content);
};
