import esbuild from "esbuild";

export default (entry, outfile) => {
  esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    outfile,
    external: ["@minecraft/server", "@minecraft/server-ui"],
    format: "esm",
  });
};
