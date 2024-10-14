import fs from "fs-extra";
import esbuild from "esbuild";
import youfile from "youfile";
import { join } from "path";

if (fs.existsSync("dist")) {
  youfile.remove("dist");
}
const externalFiles = ["README.md", "LICENCE"];
const external = ["path", "process"];
const pack = youfile.read.json("package.json");

const entryPoints = ["src/index.js"];
const outfile = join(".temp/esbuild", "index.js");

for (const name in pack.dependencies) {
  external.push(name);
}
if (pack.scripts) delete pack.scripts;

esbuild.buildSync({
  entryPoints,
  bundle: true,
  minify: true,
  outfile,
  external,
  format: "esm",
  platform: "node",
});

const fileJs = youfile.read.file(".temp/esbuild/index.js");
youfile.write.file("dist/bin/bedcli.js", "#!/usr/bin/env node\n" + fileJs);
youfile.write.json("dist/package.json", pack);

for (const readme of externalFiles) {
  youfile.copy(readme, join("dist", readme));
}

youfile.remove(".temp");
