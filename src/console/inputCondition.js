export default function inputCondition(message, condition = () => true) {
  const data = input(message);
  if (!condition(data)) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    return inputCondition(message, condition);
  }
  return data;
}
