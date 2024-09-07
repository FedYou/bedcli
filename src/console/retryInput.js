import input from "./input.js";
export default function retryInput(message) {
  const data = input(message);
  if (!data) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    return retryInput(message);
  }
  return data;
}
