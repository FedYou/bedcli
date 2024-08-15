import readline from "readline";
import "colors";
import filterArray from "../utils/filterArray.js";

export default (choices, message) => {
  return new Promise((resolve) => {
    const selected = new Array(choices.length).fill(false);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.stdout.write("\x1B[?25l");
    function render() {
      console.clear();
      console.log(message.dim.bold);
      choices.forEach((choice, index) => {
        const isSelect = selected[index];
        const startSign = isSelect ? "~".yellow : "~".bold;
        const prefix = isSelect ? "*".yellow : "°".bold;
        const option = choice.bold;

        if (index === currentIndex) {
          console.log(">".cyan.bold, prefix, choice.yellow.bold);
        } else {
          console.log(startSign, prefix, option);
        }
      });
      console.log(
        "\nUse arrow keys to move, space to select, and enter to confirm.".dim
          .bold
      );
    }

    let currentIndex = 0;
    function handleKeypress(_, key) {
      if (key.name === "up") {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : choices.length - 1;
      } else if (key.name === "down") {
        currentIndex = currentIndex < choices.length - 1 ? currentIndex + 1 : 0;
      } else if (key.name === "space") {
        selected[currentIndex] = !selected[currentIndex];
      } else if (key.name === "return") {
        rl.close();
        let list = choices.filter((_, index) => selected[index]);
        resolve(filterArray(list));
        return;
      }

      render();
    }
    rl.on("close", () => {
      console.clear();
      process.stdout.write("\x1B[?25h");
    });
    rl.input.on("keypress", handleKeypress);
    render();
  });
};
