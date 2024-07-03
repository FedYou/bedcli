function building(event, path) {
  path = path.replace(process.cwd(), "");

  console.log(
    " - ".bgWhite.black.bold,
    `There was a ${event.yellow} in the route ${path.red}, Making build`.bold
  );
}
function build() {
  return " ✓ ".bgGreen.bold + ` Build done correctly.`.green.bold;
}

export default { building, build };
