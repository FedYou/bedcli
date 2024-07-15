import fs from "fs-extra";
import esbuild from "esbuild";
import youfile from "youfile";
import { join } from "path";

if (fs.existsSync("dist")) {
  youfile.remove("dist");
}
const README = ["README.md", "README.ES.md"];
const external = ["path", "process"];
const pack = youfile.read.json("package.json");

const entryPoints = ["src/index.js"];
const outfile = "dist/src/index.js";

for (const name in pack.dependencies) {
  external.push(name);
}

if (pack.scripts) delete pack.scripts;

youfile.write.json("dist/package.json", pack, 2);
youfile.copy("templates", "dist/src/templates");
youfile.copy("bin", "dist/bin");
README.forEach((readme) => {
  youfile.copy(readme, join("dist", readme));
});

esbuild.build({
  entryPoints,
  bundle: true,
  minify: true,
  outfile,
  external,
  format: "esm",
  platform: "node",
});
