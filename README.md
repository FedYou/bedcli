# Bedcli

`bedcli` is a compiler, project builder for Minecraft Bedrock, which considerably reduces the size of final package for the release of your project, in turn helps to develop in a more versatile and faster way.
`bedcli` also allows you to compile your package without being a `bedcli` project, for more information read the documentation.

### Requirements

- Have Node 18 or higher to use `bedcli`.

### Installation

```shell
npm install bedcli -g
```

### Configuration

> Return the information of your configuration:

```shell
bedcli config --info
```

> Clear all configuration:

```shell
bedcli config --clear
```

> Define the path to the `com.mojang` folder (Necessary to use `watch` in your project):

```shell
bedcli config --com.mojang /path/games/com.mojang/
```

### Create a Bedcli project

```shell
bedcli create
```

With the `create` command you only have to fill in the requested fields, and your project will be created already configured.

### Migrate your project to Bedcli

First I created a new `bedcli` project, with settings that match your existing project.

You must copy the content of your packages in their respective folder, without the `manifest.json`.

`your_project/behavior` > Behavior pack
`your_project/resource` > Resource pack

> Configure `uuid`

`your_project/bed.config.json`

```json5
{

  "project": {
	...
  },

/// Type add-on:script
  "uuid": [
    "be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
    "df3edcc6-376c-4a73-9bec-c1a9b7529fce", // resource.modules RP
    "12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
    "59e590db-729d-4936-8043-db2c9215ec72",// behavior.modules BP
    "87bb70e5-28ce-4be5-ac6d-8932b6f952c1" // behavior.modules.script BP
  ],

/// Type add-on
  "uuid": [
    "be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
	"df3edcc6-376c-4a73-9bec-c1a9b7529fce", // resource.modules RP
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"59e590db-729d-4936-8043-db2c9215ec72" // behavior.modules BP
  ],

/// Type resource
  "uuid": [
	"be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
	"df3edcc6-376c-4a73-9bec-c1a9b7529fce" // resource.modules RP
  ],

/// Type data
  "uuid": [
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"59e590db-729d-4936-8043-db2c9215ec72" // behavior.modules BP
  ],

/// Type data
  "uuid": [
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"87bb70e5-28ce-4be5-ac6d-8932b6f952c1" // behavior.modules.script BP
  ]
}
```

> Configure `scripts`

`your_project/bed.config.json`

```json5
{
  "scripts": {
	"entry": "scripts/main.js",
	"language": "js",
	"dependencies": [...]
   }
}
```

- `scripts.entry`: Path of your script file from the `your_project/behavior` folder.
- `scripts.language`: Language of your script file can be `js` or `ts`.
- `scripts.dependencies`: These are the dependencies that your script has, `@minecraft/server` and `@minecraft/server-ui` are supported, but you can add other dependencies and change their version if they are not supported by `bedcli`.

```json
{
  "module_name": "<name>",
  "version": "<version>"
}
```

### Compile your project

The files after compilation are saved in the `your_project/dist` folder.

> If you use `bedcli pack` and you are outside the project folder the `dist` will be created in the path where you executed the command.

Compile your resource or behavior package without being a `bedcli` project:

```shell
bedcli pack --path "./"
```

- `--path`: Its default value is `./` , but paths can be relative or absolute.

Compiles your `bedcli` project:

```shell
bedcli build
```

### Testing with Bedcli

With the `watch` command you can do quick tests of your project, but it is necessary to configure the `com.mojang` path beforehand.

```shell
bedcli watch
```

> Things to keep in mind with `watch`:

- If there is a folder with the same name `watch` it will remove it.
- If there are packages with the same `header.uuid` they will be removed to avoid conflicts.
- This only covers the `development_behavior_packs` and `development_resource_packs` paths, depending on your project type.
