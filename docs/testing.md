# Testing y Pruebas

## Metodología de pruebas

Las pruebas realizadas en este proyecto son principalmente **manuales y exploratorias**, siguiendo un checklist funcional por cada módulo de la aplicación.

---

## Checklist de pruebas por funcionalidad

### Calculadora de subredes

| Caso de prueba | Entrada | Resultado esperado | ✅/❌ |
|---|---|---|---|
| IP y máscara válidas | `192.168.1.0 / /24` | Muestra red, broadcast, rango y hosts | ✅ |
| CIDR válido | `10.0.0.0 / /8` | Cálculo correcto con 16.777.214 hosts | ✅ |
| IP con octeto > 255 | `256.168.1.0` | Mensaje de error de validación | ✅ |
| Campo vacío | `""` | Mensaje de error de campo obligatorio | ✅ |
| Máscara inválida | `/33` | Mensaje de error | ✅ |
| Botón Calcular deshabilitado durante carga | — | El botón muestra "Calculando..." | ✅ |

### Tabla de puertos

| Caso de prueba | Acción | Resultado esperado | ✅/❌ |
|---|---|---|---|
| Carga inicial | Abrir la página | Se muestran todos los puertos | ✅ |
| Búsqueda por nombre | Escribir "SSH" | Filtra solo el puerto 22 | ✅ |
| Búsqueda por número | Escribir "443" | Filtra el puerto HTTPS | ✅ |
| Búsqueda sin resultados | Escribir "zzz" | Muestra mensaje "Sin resultados" | ✅ |
| Error de red | API caída | Muestra componente de error | ✅ |

### Asistente IA

| Caso de prueba | Acción | Resultado esperado | ✅/❌ |
|---|---|---|---|
| Envío de mensaje | Escribir pregunta y pulsar Enviar | IA responde | ✅ |
| Envío con Enter | Pulsar Enter | Envía el mensaje | ✅ |
| Mensaje vacío | Click en Enviar sin texto | Botón deshabilitado, no envía | ✅ |
| Estado de carga | Mientras espera respuesta | Spinner visible, input deshabilitado | ✅ |
| Historial de conversación | Varios mensajes | Se mantiene el contexto de la conversación | ✅ |

### Navegación

| Caso de prueba | Acción | Resultado esperado | ✅/❌ |
|---|---|---|---|
| Ruta existente | Navegar a `/subnet` | Carga la calculadora | ✅ |
| Ruta inexistente | Navegar a `/pagina-que-no-existe` | Muestra página 404 | ✅ |
| Botón "Volver al inicio" en 404 | Hacer click | Navega a `/` | ✅ |
| NavLink activo | Estar en `/ports` | El enlace "Puertos" aparece resaltado | ✅ |

---

## Pruebas de diseño responsive

| Dispositivo / Ancho | Estado |
|---|---|
| Desktop (1280px+) | ✅ Correcto |
| Tablet (768px) | ✅ Correcto |
| Móvil (375px) | ✅ Correcto |
| Navbar en móvil (menú hamburguesa) | ✅ Funciona |

---

## Errores encontrados y corregidos

1. **Bug:** El botón de envío del chat no se deshabilitaba correctamente durante la carga.
   - **Fix:** Se añadió la condición `disabled={loading}` correctamente en el atributo del botón.

2. **Bug:** La calculadora de subredes no limpiaba el error anterior al hacer un nuevo cálculo exitoso.
   - **Fix:** Se añadió `setError(null)` al inicio de la función `calculate`.

3. **Bug:** En móvil, la tabla de puertos desbordaba horizontalmente.
   - **Fix:** Se añadió `overflow-x-auto` al contenedor de la tabla.

4. **Bug:** El contexto del chat no se mantenía al navegar entre páginas y volver.
   - **Fix:** Se movió el estado del chat al `AssistantContext` para que persista mientras la app está montada.

---

## Revisión de consola

Se comprobó que la consola del navegador no muestra errores ni warnings al:
- Cargar la aplicación por primera vez.
- Navegar entre todas las rutas.
- Usar todas las funcionalidades principales.
- Simular errores de red con las DevTools.
