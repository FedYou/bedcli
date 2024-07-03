export default (list) => {
  let content = "";
  list.forEach((e, i) => {
    const regExp = e.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    if (i == 0) {
      content = regExp;
    } else {
      content += `|${regExp}`;
    }
  });

  return new RegExp(`(^|[/\\\\])(${content})($|[/\\\\])`);
};
