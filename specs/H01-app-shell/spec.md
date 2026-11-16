# H01 AppShell — DRAFT, NOT AUTHORIZED

Origin: S1-01. Supporting product/UI context: `docs/UI_SPEC.md`, `docs/ui-reference.png`.

User story: As the application owner, I need consistent navigation and a polished shell to inspect the planned certification experience across screens before backend features are available.

Acceptance proposal:
- AppShell/Sidebar/navigation use approved design tokens `#0078D4`, `#102A43`, `#F3F6FA` semantically, not hardcoded throughout components.
- Accessible keyboard navigation, visible focus, active route and responsive mobile navigation.
- Routes from UI_SPEC have intentional empty/coming-soon states; do not imply functional CRUD/exam completion.
- UI references the six-panel mockup's professional navy/blue visual direction, spacing, cards and typography; excludes its fictional scores, assumed official exam facts and illustrative stack label.
- Screenshot(s) of desktop/mobile plus narrow UI checks recorded in `verification.md`.
- No D1 integration, Docker changes, full data model changes or remote resources.

Human must review and approve scope/design before this can execute. H01 alone does not constitute S1 acceptance.

## Historia y criterios canónicos (F06)

Historia: [HU-SHELL-01](stories/HU-SHELL-01.md), origen S1-01. La ficha enlaza estos criterios; no mantiene otra definición de aceptación.

- **AC-H01-01:** En escritorio, navegación por teclado entre sidebar y contenido con foco visible, ruta activa y acceso a las rutas escritas en `UI_SPEC.md`.
- **AC-H01-02:** En móvil, el menú se despliega y cierra sin ocultar acciones esenciales; controles accesibles y `aria-expanded` anuncian su estado.
- **AC-H01-03:** `AppShell`, `Sidebar` y tokens compartidos; cargando/vacío/error son distinguibles y las rutas pendientes tienen estados intencionales. No presentar números de ejemplo como progreso real.
- **AC-H01-04:** Estructura de tarjetas, sidebar, espaciado y tipografía revisada manualmente frente a `docs/ui-reference.png`, con capturas desktop/móvil y comprobaciones UI acotadas registradas en `verification.md`; no exige datos D1 para aceptar layout-only.

## Entrada y entorno pendientes (F03/F04)

H01 no cierra S1 ni sustituye P0/P1. Adelantarlo al cierre S0 requiere excepción HITL expresa, G1 de spec/design y G2 de una tarea exacta. El entorno UI utilizable aún no está demostrado: la página actual y la configuración de desarrollo dependen de OpenNext/D1. Ver [design.md](design.md) para la propuesta mínima, sin implementación autorizada.
