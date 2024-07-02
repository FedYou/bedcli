import inquirer from "inquirer";
import jsonData from "../json/index.js";

const messages = jsonData.messages;
const commands = jsonData.commands;

const questions = [
  {
    type: "input",
    name: "name",
    message: messages.input.projectName,
    validate: function (input) {
      if (input.trim().length === 0) {
        return messages.validate.projectName.red.bold;
      }
      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: messages.input.projectDescription,
  },
  {
    type: "input",
    name: "author",
    message: messages.input.author,
    validate: function (input) {
      if (input.trim().length === 0) {
        return messages.validate.author.red.bold;
      }
      return true;
    },
  },

  {
    type: "list",
    name: "minEngineVersion",
    message: messages.input.minEngineVersion,
    choices: commands.create.minEngineVersion,
    loop: false,
  },
  {
    type: "list",
    name: "type",
    message: messages.input.typeProject,
    choices: commands.create.typeProject,
    loop: false,
  },
  {
    type: "list",
    name: "language",
    message: messages.input.language,
    choices: commands.create.language,
    when: (answers) => answers.type === "scr" || answers.type === "adscr",
    loop: false,
  },
  {
    type: "checkbox",
    name: "dependencies",
    message: messages.input.dependencies,
    choices: commands.create.dependencies,
    when: (answers) => answers.type === "scr" || answers.type === "adscr",
    filter: function (input) {
      return input.reduce((acc, choice) => {
        acc[choice] = true;
        return acc;
      }, {});
    },
  },
  {
    type: "list",
    name: "server",
    message: messages.input.dependencieServer,
    choices: commands.create.dependencieServer,
    pageSize: commands.create.dependencieServer.length,
    when: (answers) => {
      if (answers.dependencies && answers.dependencies["@minecraft/server"]) {
        return true;
      }
      return false;
    },
    filter: function (input, answers) {
      answers.dependencies["@minecraft/server"] = input;
      return input;
    },
  },
  {
    type: "list",
    name: "serverUi",
    message: messages.input["dependencieServerUi"],
    choices: commands.create["dependencieServerUi"],
    when: (answers) => {
      if (
        answers.dependencies &&
        answers.dependencies["@minecraft/server-ui"]
      ) {
        return true;
      }
      return false;
    },
    filter: function (input, answers) {
      answers.dependencies["@minecraft/server-ui"] = input;
      return input;
    },
  },
];
export default async () => {
  const answers = await inquirer.prompt(questions);
  delete answers.server;
  delete answers.serverUi;
  return answers;
};
