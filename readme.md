# Bedcli

[English](readme.en.md)

Maneja tus proyectos de `add-ons`, `texturas` y `Scripts` de forma fácil.

### Caracteristicas

- Permite hacer build de tu proyecto con minificado.

- Ofusca tu proyecto para que no sea tan fácil de robar su código.

- Usa `esbuild` para el minificado de los archivos `.js` de forma rápida.

### Instalación

```bash
npm install https://github.com/FedYou/bedcli.git -g
```

### Uso

```bash
bedcli <command>
```

### Comandos

- `create` : Crea un nuevo proyecto.

- `build`: Empaqueta tu proyecto en `.mcpack`

- `watch`: Permite hacer pruebas en tiempo real con cada cambio.

- `help`: Obtiene una lista de los comandos con una breve descripción.

### Configuración

```json
{
  "project": {
    "type": "adscr", // Tipo de proyecto. ad=add-on, adscr= add-on & script, bp=behavior, rp=resource, scr=script
    "name": "My Project", //Nombre del proyecto (!No usar espacios al final y comienzo)
    "description": "My description", // Descripción del proyecto
    "version": [0, 0, 1], // Versión de proyecto.
    "minEngineVersion": [1, 20, 60], // Versión mínima del juego.
    "authors": ["Author"], // Nombre del autor o autores
    "obfuscator": false // Si se Ofusca (!Puede hacer tu proyecto más pesado)
  },
  "scripts": {
    "entry": "scripts/main.js", // Ruta del archivo javascript dentro del "BP"
    "language": "javascript", // Lenguaje a usar javascript o typescript
    "dependencies": [
      // Solo se admite estas 2 dependencias por el momento.
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
    // Las carpetas donde se guardara un build rápido para hacer pruebas.
    "behavior": "dist/behavior", // Ejemplo ...games/com.mojang/development_behavior_packs
    "resource": "dist/resource" // Ejemplo ...games/com.mojang/development_resource_packs
  },
  "uuid": [
    // Lista de los uuid del proyecto (!No tocar)
  ]
}
```

### Build

Por el momento no se puede agregar archivos externos como licencias al `build`, pero próximamente se agregara esta función.
