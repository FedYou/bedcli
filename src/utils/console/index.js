import "colors";
import error from "../error.js";
import check from "./check.js";
import checkPath from "./checkPath.js";
import wait from "./wait.js";
import waitPath from "./waitPath.js";
import line from "./line.js";
import clearLine from "./clearLine.js";
import item from "./item.js";

const functions = {
  check,
  wait,
  error,
  line,
  clearLine,
  item,
};
console.new = functions;

console.new.checkPath = checkPath;
console.new.waitPath = waitPath;
