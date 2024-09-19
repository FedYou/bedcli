import enquirer from "enquirer";

export default async ({ message = "", choices = [], retry = false }) => {
  const prompt = await enquirer.prompt({
    type: "multiselect",
    name: "value",
    message,
    choices,
    validate: (value) => {
      if (retry) {
        if (value.length === 0) {
          return "Please select at least one option.";
        }
      }
      return true;
    },
  });
  return prompt.value;
};
