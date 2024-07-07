import yfile from "youfile";
import path from "path";
import __dirname from "../__dirname.js";
export default {
  commands: yfile.read.json5(path.join(__dirname, "json/commands.json")),
  messages: yfile.read.json5(path.join(__dirname, "json/messages.json")),
};
