export default () => {
  console.log("~create".bold.dim, "\t Create a new project.".dim);
  console.log("~build ".bold.dim, "\t Package your project.".dim);
  console.log(
    "~watch ".bold.dim,
    "\t Every time there are changes, pack your project for testing.".dim
  );
  console.log("~help  ".bold.dim, "\t Get the list of commands.".dim);
};
