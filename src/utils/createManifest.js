import yfile from "youfile";
import { join } from "path";
export default (output, content) => {
  yfile.write.json(join(output, "manifest.json"), content);
};
