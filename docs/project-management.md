# Gestión del Proyecto

## Herramienta utilizada: Trello

Para organizar el desarrollo de NetAdmin-Hub se utilizó un tablero de Trello con metodología Kanban. El tablero permite visualizar el estado de cada tarea y moverla entre columnas según avanza el trabajo.

**Enlace al tablero:** *(añade aquí el enlace a tu tablero de Trello)*

---

## Estructura del tablero

El tablero está organizado con las siguientes columnas:

- **Backlog:** Todas las funcionalidades e ideas pendientes de empezar, ordenadas por prioridad.
- **Todo:** Tareas seleccionadas para el sprint o ciclo de trabajo actual, listas para empezar.
- **In Progress:** Tareas en las que se está trabajando actualmente. Se limita a 2-3 tarjetas para no dispersar el foco.
- **Review:** Tareas implementadas que necesitan revisión, pruebas o ajustes antes de darse por terminadas.
- **Done:** Tareas completamente terminadas.

---

## Ejemplos de tarjetas por funcionalidad

### Calculadora de subredes
- Diseño del componente de entrada (IP + máscara)
- Lógica de cálculo de red, broadcast y rango
- Presentación de resultados con tabla
- Validación de entradas incorrectas

### Asistente IA
- Integración con la API de Anthropic
- Componente de chat (input + historial de mensajes)
- Gestión de estados: loading, respuesta, error
- Estilos y UX del chat

### Documentación
- `docs/agile.md`
- `docs/idea.md`
- `docs/design.md`
- `docs/components.md`
- `docs/hooks.md`
- `docs/context.md`
- `docs/routing.md`
- `docs/forms.md`
- `docs/api.md`
- `docs/testing.md`
- `docs/deployment.md`
- `docs/retrospective.md`

---

## Cómo se organizó el trabajo

El desarrollo se realizó de forma individual. Se siguió un flujo de trabajo basado en Kanban:

1. Se identificaron todas las funcionalidades en el Backlog.
2. Se dividió cada funcionalidad en subtareas técnicas concretas.
3. Se empezaron las tareas por orden de importancia: primero la estructura base del proyecto, luego las herramientas principales, después la integración de la API, y finalmente la documentación y el despliegue.
4. Cada tarea pasó por las columnas del tablero hasta llegar a Done.
5. Los commits de Git se alinearon con el avance de las tarjetas en el tablero.

---

## Relación con Git

Cada funcionalidad principal tuvo su propio conjunto de commits, siguiendo este patrón:
- `feat:` para nuevas funcionalidades
- `fix:` para correcciones de bugs
- `docs:` para cambios en documentación
- `style:` para ajustes de estilos sin cambio de lógica
- `refactor:` para reorganización de código
