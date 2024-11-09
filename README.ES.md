# Bedcli

`bedcli` es un compilador, constructor de proyectos para Minecraft Bedrock, que reduce el tamaño considerablemente de paquete final para la publicación de su proyecto, a su vez ayuda al desarrollo de manera más versátil y rápida.
`bedcli` también permite compilar su paquete sin ser un proyecto de `bedcli`, para más información lea la documentación.

### Requisitos

- Tener Node 18 o superior para usar `bedcli`.

### Instalación

```shell
npm install bedcli -g
```

### Configuración

> Retornar la información de su configuración:

```shell
bedcli config --info
```

> Borrar toda la configuración:

```shell
bedcli config --clear
```

> Definir la ruta de la carpeta `com.mojang` (Necesaria para usar `watch` en su proyecto):

```shell
bedcli config --com.mojang /path/games/com.mojang/
```

### Crear un proyecto de Bedcli

```shell
bedcli create
```

Con el comando `create` solo debe rellenar los campos pedidos, y su proyecto se creara ya configurado.

### Migrar su proyecto a Bedcli

Primero creé un nuevo proyecto de `bedcli`, con la configuración que coincida con su proyecto existente

Usted debe copiar el contenido de sus paquetes en su carpeta respectivo, sin el `manifest.json`

`your_project/behavior` > Paquete de comportamiento
`your_project/resource` > Paquete de recursos

> Configurar `uuid`

`your_project/bed.config.json`

```json5
{

  "project": {
	...
  },

/// Tipo add-on:script
  "uuid": [
    "be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
    "df3edcc6-376c-4a73-9bec-c1a9b7529fce", // resource.modules RP
    "12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
    "59e590db-729d-4936-8043-db2c9215ec72",// behavior.modules BP
    "87bb70e5-28ce-4be5-ac6d-8932b6f952c1" // behavior.modules.script BP
  ],

/// Tipo add-on
  "uuid": [
    "be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
	"df3edcc6-376c-4a73-9bec-c1a9b7529fce", // resource.modules RP
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"59e590db-729d-4936-8043-db2c9215ec72" // behavior.modules BP
  ],

/// Tipo resource
  "uuid": [
	"be75bfeb-98a3-43f6-bb89-beab7af68462", // resource.header RP
	"df3edcc6-376c-4a73-9bec-c1a9b7529fce" // resource.modules RP
  ],

/// Tipo data
  "uuid": [
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"59e590db-729d-4936-8043-db2c9215ec72" // behavior.modules BP
  ],

/// Tipo data
  "uuid": [
	"12c0622a-451c-4588-a87d-550bfe429204", // behavior.header BP
	"87bb70e5-28ce-4be5-ac6d-8932b6f952c1" // behavior.modules.script BP
  ]
}
```

> Configurar `scripts`

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

- `scripts.entry`: Ruta de su archivo script desde la carpeta `your_project/behavior`.
- `scripts.language`: Lenguaje de su archivo script puede ser `js` o `ts`.
- `scripts.dependencies`: Son las dependencias que tiene su script, se soporta `@minecraft/server` y `@minecraft/server-ui`, pero puedas agregar otras dependencias y cambiar su versión si no esta soportada por `bedcli`.

```json
{
  "module_name": "<name>",
  "version": "<version>"
}
```

### Compilar su proyecto

Los archivos después de ser compilados se guardan en la carpeta `your_project/dist`.

> Si se usa `bedcli pack` y estas fuera de la carpeta del proyecto el `dist` se crear en la ruta donde se ejecutó el comando.

Compila su paquete de recursos o comportamientos sin ser un proyecto `bedcli`:

```shell
bedcli pack --path "./"
```

- `--path`: Su valor default es `./` , pero las rutas pueden ser relativas o absolutas.

Compila su proyecto de `bedcli`

```shell
bedcli build
```

### Testing con Bedcli

Con el comando `watch` puedes hacer pruebas rápidas de tu proyecto, pero es necesario previamente configurar la ruta de `com.mojang`

```shell
bedcli watch
```

> Cosas a tener en cuenta con `watch`:

- Si existe una carpeta con el mismo nombre `watch` la eliminara.
- Si ahí paquetes que tengan el mismo `header.uuid` serán eliminados para que no haya. conflictos.
- Esto solo abarca las rutas de `development_behavior_packs` y `development_resource_packs`, según su tipo de proyecto.
