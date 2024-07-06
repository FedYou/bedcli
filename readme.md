# Bedcli

Manage your `add-ons`, `textures`, and `scripts` projects easily.

### Features

- Allows building your project with minification.
- Obfuscates your project to make it harder to steal your code.
- Uses `esbuild` for quick minification of `.js` files.

### Installation

```bash
npm install bedcli -g
```

### Usage

```bash
bedcli <command>
```

### Commands

- `create`: Creates a new project.
- `build`: Packages your project into `.mcpack`.
- `watch`: Allows real-time testing with each change.
- `help`: Gets a list of commands with a brief description.

### Configuration

```json
{
  "project": {
    "type": "adscr", // Project type. ad=add-on, adscr=add-on & script, bp=behavior, rp=resource, scr=script
    "name": "My Project", // Project name (!Do not use spaces at the beginning or end)
    "description": "My description", // Project description
    "version": [0, 0, 1], // Project version
    "minEngineVersion": [1, 20, 60], // Minimum game engine version
    "authors": ["Author"] // Author name or names
  },
  "scripts": {
    "entry": "scripts/main.js", // Path to the javascript file within the "BP"
    "language": "javascript", // Language to use: javascript or typescript
    "dependencies": [
      // Only these 2 dependencies are supported at the moment
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
  "build": {
    "obfuscator": false, // Whether to obfuscate (May increase project size)
    "external": ["LICENSE"] // Add external files to the "build" that are within the project folder
  },
  "output": {
    // Folders where a quick build will be saved for testing
    "behavior": "dist/behavior", // Example ...games/com.mojang/development_behavior_packs
    "resource": "dist/resource" // Example ...games/com.mojang/development_resource_packs
  },
  "uuid": [
    // List of project UUIDs (Do not modify)
  ]
}
```
