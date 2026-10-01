# claude-ai-sdlc-cva-dashboard

A mini CVA (credit valuation adjustment) monitoring dashboard, built as a guided tour through an AI-assisted SDLC: one small React app, one AI tool per stage of the pipeline.

Domain: CVA charge monitoring by counterparty, with CDS spreads as a pricing input — the same shape as a full-stack CVA UI built in React/C# in a past role, rebuilt here to demonstrate stage-appropriate AI tool selection rather than CVA methodology itself.

- **Stitch** — dashboard mockup (dense data table + filter panel)
- **Replit Agent** — scaffolds the React app from the design + mock data
- **Storybook** — isolates the grid component, documents its states
- **Playwright** — one E2E test: load, filter, assert
- **CodeRabbit** — AI PR review on a deliberately rough-edged change
- **Notion AI** — turns build notes into a portfolio writeup

See [ROADMAP.md](ROADMAP.md) for the module plan and current status.
