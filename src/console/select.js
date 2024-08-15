import "colors";
import cliSelect from "cli-select";

export default async (values = []) => {
  return cliSelect({
    selected: ">".yellow.bold,
    unselected: "~".bold,
    values,
    valueRenderer: (value, selected) => {
      if (selected) {
        return value.underline.yellow;
      }
      return value;
    },
  });
};
