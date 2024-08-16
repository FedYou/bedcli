export default (message = "undefined") => {
  console.log("Error:".bgRed.bold);
  console.log(`\t${message.bold}`);
  process.exit(0);
};
