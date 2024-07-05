export default () => {
  process.stdout.write("\x1b[1A");
  process.stdout.clearLine(0);
};
