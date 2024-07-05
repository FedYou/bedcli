# Bedcli

Manage your `add-ons`, `textures` and `Scripts` projects easily.

### Features

- Allows you to build your project with minification.

- Obfuscate your project so that it is not so easy to steal your code.

- Use `esbuild` to minify `.js` files quickly.

### Installation

```bash
npm install https://github.com/FedYou/bedcli.git -g
```

### Use

```bash
bedcli <command>
```

### Commands

- `create` : Create a new project.

- `build`: Package your project in `.mcpack`.

- `watch`: Allows you to test in real time with each change.

- `help`: Gets a list of commands with a brief description.

### Configuration

```json
{
  "project": {
    "type": "adscr", // Type of project. ad=add-on, adscr= add-on & script, bp=behavior, rp=resource, scr=script
    "name": "My Project", //Name of the project (!Do not use spaces at the end and at the beginning)
    "description": "My description", // Project description
    "version": [0, 0, 1], // Project version.
    "minEngineVersion": [1, 20, 60], // Minimum version of the game.
    "authors": ["Author"], // Name of the author(s).
    "obfuscator": false // If it obfuscates (!It can make your project heavier).
  },
  "scripts": {
    "entry": "scripts/main.js", // Path to the javascript file inside the "BP".
    "language": "javascript", // Language to use javascript or typescript.
    "dependencies": [
      // Only these 2 dependencies are supported at the moment.
      {
        "module_name": "@minecraft/server",
        "version": "1.11.0"
      },
      {
        "module_name": "@minecraft/server-ui",
        "version": "1.2.0"
      }
    ]
  },
  "output": {
    // The folders where a quick build will be saved for testing.
    "behavior": "dist/behavior", // Example ...games/com.mojang/development_behavior_packs
    "resource": "dist/resource" // Example ...games/com.mojang/development_resource_packs
  },
  "uuid": [
    // List of project uuids (!Do not touch).
  ]
}
```

### Build

At the moment it is not possible to add external files as licenses to the `build`, but this feature will be added soon.
