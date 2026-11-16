# H01 design proposal — NOT APPROVED

Build shared AppShell/sidebar/navigation in existing `src` structure, keep presentational components independent from Cloudflare specifics. Use simple empty data states; never hardcode fake progress as real values. Inspect actual source files and existing page implementation before choosing edits. A visual review should compare composition from mockup and test 3 widths (desktop/tablet/mobile). Do not create fake operational APIs merely to fill screens.
