import readline from "readline";
import face from "./face.js";
class create {
  #rl;
  constructor() {
    this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.#rl.pause();
    process.stdout.write("\x1b[?25l");
    process.on("exit", () => process.stdout.write("\x1b[?25h"));
  }
  message(...message) {
    console.log(message.join("\t"));
  }
  text(message) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdin, 0);
    const maxLength = process.stdout.columns;
    if (message.length > maxLength) {
      message = message.slice(0, maxLength - 3) + "...";
    }
    process.stdout.write(message);
  }
  face(message) {
    face(message);
  }
  clearLine() {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdin, 0);
  }
  close() {
    this.#rl.close();
  }
  line() {
    process.stdout.write("\n");
  }
}

export default () => {
  return new create();
};
