import "colors";
import promptSync from "prompt-sync";

export default (message) => {
  const prompt = promptSync({ sigint: true });
  return prompt(`${"~".yellow} ${message}: `.bold);
};
