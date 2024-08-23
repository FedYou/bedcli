import fs from "fs-extra";
import esbuild from "esbuild";
import youfile from "youfile";
import { join } from "path";
import { execSync } from "child_process";

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
pack.dependencies = {
  sharp: pack.dependencies.sharp,
};
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

execSync(`ncc build ${outfile} --minify -o .temp/ncc --external sharp`);

const fileJs = youfile.read.file(".temp/ncc/index.js");
youfile.write.file("dist/bin/bedcli.js", "#!/usr/bin/env node\n" + fileJs);
youfile.write.json("dist/package.json", pack);

for (const readme of externalFiles) {
  youfile.copy(readme, join("dist", readme));
}

youfile.remove(".temp");
