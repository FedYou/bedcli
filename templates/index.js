import yfile from "youfile";
import path from "path";
import __dirname from "../__dirname.js";

export default {
  resource: path.join(__dirname, "/templates/rp"),
  behavior: path.join(__dirname, "/templates/bp"),
  package: yfile.read.json(path.join(__dirname, "package.json")),
};
