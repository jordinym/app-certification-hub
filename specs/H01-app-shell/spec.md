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

## Historias / escenarios adicionales (propuestos)
- **HU-SHELL-01 / S1-01:** Como usuario quiero navegar entre dashboard, certificaciones, planes, simulacros, recursos y ajustes desde un shell consistente.
- **AC-H01-01:** En escritorio, al navegar con teclado entre sidebar y contenido, el foco es visible y las rutas son accesibles.
- **AC-H01-02:** En móvil, el menú se despliega y cierra sin ocultar acciones esenciales; `aria-expanded` refleja estado.
- **AC-H01-03:** Cargando/vacío/error son distinguibles; no presentar números de ejemplo como progreso real.
- **AC-H01-04:** Estructura visual de tarjetas, sidebar y tipografía se revisa manualmente frente a `docs/ui-reference.png`; no exige datos D1 para aprobar layout-only.
- **No equivale a aprobar S1:** requiere permiso para adelantar UI pese a gate S0, y nunca sustituye P0/P1.

## Historias / escenarios adicionales (propuestos)
- **HU-SHELL-01 / S1-01:** Como usuario quiero navegar entre dashboard, certificaciones, planes, simulacros, recursos y ajustes desde un shell consistente.
- **AC-H01-01:** En escritorio, al navegar con teclado entre sidebar y contenido, el foco es visible y las rutas son accesibles.
- **AC-H01-02:** En móvil, el menú se despliega y cierra sin ocultar acciones esenciales; `aria-expanded` refleja estado.
- **AC-H01-03:** Cargando/vacío/error son distinguibles; no presentar números de ejemplo como progreso real.
- **AC-H01-04:** Estructura visual de tarjetas, sidebar y tipografía se revisa manualmente frente a `docs/ui-reference.png`; no exige datos D1 para aprobar layout-only.
- **No equivale a aprobar S1:** requiere permiso para adelantar UI pese a gate S0, y nunca sustituye P0/P1.
