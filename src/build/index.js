import youfile from "youfile";
import manifest from "../gen/manifest.js";

export default (config) => {
  youfile.write.json("test.json", manifest(config));
};
