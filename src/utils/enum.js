const PROJECT_TYPES = {
  AD: "ad",
  ADSCR: "adscr",
  RP: "rp",
  BP: "bp",
  SCR: "scr",
};
const FOLDERS_BEHAVIOR = [
  "entities",
  "items",
  "loot_tables",
  "recipes",
  "spawn_rules",
  "trading",
  "blocks",
  "texts",
  "structures",
];
const FOLDERS_RESOURCE = [
  "animation_controllers",
  "animations",
  "attachables",
  "entity",
  "fogs",
  "models",
  "particles",
  "render_controls",
  "texts",
  "textures",
  "ui",
  "sounds",
];
const FILES_RESOURCE = [
  "biomes_client.json",
  "blocks.json",
  "content.json",
  "pack_icon.png",
  "sounds.json",
];
const FILES_BEHAVIOR = ["pack_icon.png"];
const BUILD_IGNORED = ["node_modules", "dist"];

export {
  PROJECT_TYPES,
  FOLDERS_BEHAVIOR,
  FOLDERS_RESOURCE,
  FILES_RESOURCE,
  FILES_BEHAVIOR,
  BUILD_IGNORED,
};
