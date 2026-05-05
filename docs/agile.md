# Metodologías de Desarrollo de Software

## ¿Qué es Agile?

Agile (o "ágil") es una filosofía de desarrollo de software que nació como respuesta a los métodos tradicionales, más rígidos y lentos. Su objetivo principal es entregar software funcional de forma frecuente y adaptarse rápidamente a los cambios, ya sea en los requisitos del cliente, en el mercado o en el equipo.

En lugar de planificar todo al inicio y trabajar meses sin mostrar resultados, Agile propone trabajar en ciclos cortos (llamados iteraciones), revisando y ajustando constantemente. La colaboración con el cliente, la comunicación continua dentro del equipo y la capacidad de cambiar de dirección sin que eso suponga un desastre son los pilares de esta filosofía.

El **Manifiesto Ágil** (2001) resume sus valores en cuatro puntos:
- Individuos e interacciones por encima de procesos y herramientas
- Software funcionando por encima de documentación exhaustiva
- Colaboración con el cliente por encima de negociación de contratos
- Respuesta al cambio por encima de seguir un plan

---

## ¿Qué es Scrum?

Scrum es uno de los marcos de trabajo (frameworks) más populares dentro de Agile. Define una estructura concreta con roles, eventos y artefactos para organizar el trabajo en equipo.

### Roles en Scrum

- **Product Owner (PO):** Es el responsable de definir qué hay que construir y en qué orden. Mantiene el *Product Backlog* priorizado y actúa como voz del cliente dentro del equipo.
- **Scrum Master:** Es el facilitador del equipo. Su función es eliminar obstáculos, asegurarse de que el equipo sigue las prácticas de Scrum y proteger al equipo de interrupciones externas.
- **Development Team:** El equipo que construye el producto. Son autogestionados y responsables de entregar trabajo terminado al final de cada Sprint.

### Conceptos principales

- **Sprint:** Un ciclo de trabajo de duración fija, normalmente entre 1 y 4 semanas. Al final de cada Sprint se entrega un incremento funcional del producto.
- **Product Backlog:** Lista priorizada de todo lo que se quiere construir en el producto. Es responsabilidad del Product Owner.
- **Sprint Backlog:** El subconjunto de tareas del Product Backlog que el equipo se compromete a completar durante un Sprint concreto.
- **Sprint Planning:** Reunión al inicio del Sprint donde el equipo decide qué van a construir y cómo.
- **Daily Scrum (Daily Standup):** Reunión diaria de máximo 15 minutos donde el equipo sincroniza su trabajo: qué hicieron ayer, qué harán hoy y si hay algún bloqueo.
- **Sprint Review:** Reunión al final del Sprint para mostrar el trabajo completado a los stakeholders y recibir feedback.
- **Sprint Retrospective:** Reunión del equipo para reflexionar sobre el proceso: qué fue bien, qué mejorar y qué cambiar en el próximo Sprint.
- **Definition of Done (DoD):** Criterio compartido por el equipo que define cuándo una tarea se considera realmente terminada.

---

## ¿Qué es Kanban?

Kanban es otro método ágil que se basa en visualizar el flujo de trabajo y limitar el trabajo en progreso (WIP, Work In Progress). A diferencia de Scrum, Kanban no tiene sprints, roles fijos ni reuniones obligatorias.

Su herramienta principal es el **tablero Kanban**, que representa visualmente el estado de las tareas con columnas como:
- **Backlog / Pendiente**
- **En progreso**
- **En revisión**
- **Hecho**

Cada tarea (tarjeta) avanza de izquierda a derecha a medida que progresa. La clave de Kanban es el concepto de **límite WIP**: no se puede tener más de X tareas en progreso al mismo tiempo, lo que obliga al equipo a terminar lo que está empezado antes de empezar algo nuevo.

---

## Diferencias entre Scrum y Kanban

| Característica | Scrum | Kanban |
|---|---|---|
| Estructura temporal | Sprints de duración fija | Flujo continuo, sin iteraciones |
| Roles | PO, Scrum Master, Dev Team | No hay roles definidos |
| Planificación | Sprint Planning al inicio | Bajo demanda, continua |
| Cambios durante el trabajo | No se permiten durante el Sprint | Se pueden incorporar en cualquier momento |
| Métricas | Velocidad del equipo | Tiempo de ciclo (cycle time) |
| Reuniones | Daily, Review, Retro, Planning | Opcionales y a criterio del equipo |
| WIP Limit | Implícito (lo que cabe en el Sprint) | Explícito y visible en el tablero |

---

## ¿Cuándo usar cada metodología?

### Usar Scrum cuando…
- El proyecto tiene un Product Owner claro y disponible.
- Los requisitos pueden cambiar pero se pueden definir por bloques en cada Sprint.
- El equipo es estable y trabaja a tiempo completo en el proyecto.
- Se quiere un ritmo predecible de entrega con revisiones periódicas.
- El proyecto es de larga duración y necesita estructura.

### Usar Kanban cuando…
- El trabajo es continuo y no se puede dividir fácilmente en sprints (ej. soporte técnico, mantenimiento).
- El equipo recibe tareas de forma impredecible y con prioridades cambiantes.
- Se quiere mejorar un proceso existente sin cambiar la estructura del equipo.
- El proyecto es pequeño o el equipo trabaja solo o en parejas.
- Se quiere empezar de forma ligera sin muchas reuniones ni roles nuevos.

---

*En este proyecto (NetAdmin-Hub) se utilizó un enfoque basado en Kanban con un tablero en Trello, ya que el trabajo fue realizado de forma individual con tareas de distinto tipo y prioridad variable.*
