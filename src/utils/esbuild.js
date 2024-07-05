import esbuild from "esbuild";
import { DEPENDECIES } from "./enum.js";
export default (entry, outfile) => {
  esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    outfile,
    external: DEPENDECIES,
    format: "esm",
  });
};
