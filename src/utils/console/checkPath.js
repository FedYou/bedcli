import { basename } from "path";
export default (message, path) => {
  path = basename(path);
  console.new.check(`${message} ${path.red}`);
};
