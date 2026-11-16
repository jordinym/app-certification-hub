# HU-SHELL-01 — Navegación de Certification Hub

> Borrador no aprobado; origen `S1-01`.

**Como usuario** quiero una navegación consistente para entrar a dashboard, catálogo, planes, simulacros, recursos y configuración desde escritorio o móvil, **para** encontrar rápidamente cada función.

## Criterios de aceptación
- **AC-H01-01:** navegación por teclado con foco visible entre enlaces y contenido; acceso a las rutas escritas en `UI_SPEC.md`.
- **AC-H01-02:** menú móvil funcional, controles accesibles y estados de expansión anunciados.
- **AC-H01-03:** componentes `AppShell`, `Sidebar`, estados vacíos/cargando/error y tokens compartidos; sin porcentajes inventados.
- **AC-H01-04:** revisión visual contra `docs/ui-reference.png` con capturas desktop/móvil.

## Dependencias/limitaciones
- Solo layout y navegación; fixtures identificados explícitamente cuando no exista D1 probada.
- No aprueba el catálogo S1; necesita excepción HITL expresa si S0 sigue abierto.
- No autoriza trabajo en Docker, migración, despliegue ni backend.

## Evidencia
Capturas, comprobación de teclado, rutas y resultado de la prueba acotada. Estado: sin verificar y sin HITL.
