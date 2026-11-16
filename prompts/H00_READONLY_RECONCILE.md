# PROMPT — H00 RECONCILIACIÓN, SIN CÓDIGO NI DOCKER

Actúa como auditor principal de SDD/HITL para `app-certification-hub`. Hito activo: H00, **READ ONLY**.

1. Leer `AGENTS.md`, `docs/README.md`, `docs/sdd/ACTIVE_MILESTONE.md`, `docs/sdd/REPO_AUDIT_CHECKLIST.md`.
2. Verificar que el baseline importado coincide con `PRODUCT_SPEC`, `BACKLOG`, `IMPLEMENTATION_PLAN`, `UI_SPEC`, `ARCHITECTURE`, `DECISIONS`, `COMPATIBILITY`, `DEPLOYMENT`, `DOCKER_DEV`, `S0_REPORT` y `ui-reference.png`. No reescribirlos.
3. Validar 37 tareas originales, diez criterios A0, y todas las HU/AC contra las specs de P0/P1/H00-H08. Identificar faltantes exactos, contradicciones y propuestas sin aprobación.
4. Revisar la imagen PNG real y comparar seis paneles con matriz de UI, incluyendo rutas escritas fuera del mockup.
5. Inspeccionar **solo archivos de código necesarios** para clasificar el avance como implementado no verificado / verificado / bloqueado; no instalar, compilar, ejecutar tests, Docker ni comandos que modifiquen datos.
6. Entregar informe corto: cobertura con tabla, decisiones pendientes y orden de las primeras cinco tareas de mayor valor. Indicar qué evidencia falta y cuál es la siguiente aprobación HITL.
7. **STOP.** No editar specs ni código sin nueva aprobación. No iniciar otro hito. Si el árbol tiene cambios sin commit, no los sobrescribas.
