import path from "path";
import __dirname from "../__dirname.js";
import pack from "./package.json" assert { type: "json" };
export default {
  resource: path.join(__dirname, "/templates/rp"),
  behavior: path.join(__dirname, "/templates/bp"),
  package: pack,
};
