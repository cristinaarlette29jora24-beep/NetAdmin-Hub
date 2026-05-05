# Instrucciones de Migración a TypeScript

## Paso 1 — Instala dependencias que faltan

En la raíz de tu proyecto ejecuta:

```bash
npm install react-router-dom
npm install -D typescript @types/react @types/react-dom @types/react-router-dom
```

## Paso 2 — Copia los archivos de este ZIP

Copia TODO el contenido de este ZIP a tu proyecto reemplazando los archivos existentes:

| Archivo del ZIP | Destino en tu proyecto |
|---|---|
| `tsconfig.json` | raíz del proyecto |
| `vite.config.ts` | raíz (reemplaza `vite.config.js`) |
| `src/main.tsx` | reemplaza `src/main.jsx` |
| `src/App.tsx` | reemplaza `src/App.jsx` |
| `src/firebase.ts` | reemplaza `src/firebase.js` |
| `src/types/index.ts` | carpeta nueva `src/types/` |
| `src/components/Auth/Login.tsx` | reemplaza `Login.jsx` |
| `src/components/Layout/SidebarNEW.tsx` | reemplaza `SidebarNEW.jsx` |
| `src/components/Layout/TopbarNEW.tsx` | reemplaza `TopbarNEW.jsx` |
| `src/components/Calculator/SubnetCalc.tsx` | reemplaza `SubnetCalc.jsx` |
| `src/components/Calculator/IPSubnetCalculator.tsx` | reemplaza `IPSubnetCalculator.jsx` |
| `src/components/CLI/CommandList.tsx` | reemplaza `CommandList.jsx` |
| `src/components/AI/AIChat.tsx` | reemplaza `AIChat.jsx` |

## Paso 3 — Borra los archivos .jsx/.js originales

```bash
# En la raíz
rm vite.config.js

# En src/
rm src/main.jsx src/App.jsx src/firebase.js

# Componentes
rm src/components/Auth/Login.jsx
rm src/components/Layout/SidebarNEW.jsx
rm src/components/Layout/TopbarNEW.jsx
rm src/components/Calculator/SubnetCalc.jsx
rm src/components/Calculator/IPSubnetCalculator.jsx
rm src/components/CLI/CommandList.jsx
rm src/components/AI/AIChat.jsx
```

## Paso 4 — Comprueba que funciona

```bash
npm run dev
```

Si hay errores de TypeScript en la terminal, son normales al principio.
Los más comunes y cómo resolverlos:

- `Cannot find module '../../data/commands.json'`
  → Añade `"resolveJsonModule": true` en `tsconfig.json` dentro de `compilerOptions`

- `Property 'X' does not exist on type 'Y'`
  → El tipo no coincide; revisa `src/types/index.ts` y ajusta

## Paso 5 — Sube los cambios

```bash
git add .
git commit -m "feat: migrate project to TypeScript"
git push
```

## Paso 6 — Añade también la carpeta docs/

Si aún no has subido la carpeta `docs/` que se generó anteriormente:

```bash
git add docs/
git commit -m "docs: add full project documentation"
git push
```
