# claude-ai-sdlc-cva-dashboard

A mini CVA (credit valuation adjustment) monitoring dashboard, built as a guided tour through an AI-assisted SDLC: one small React app, one AI tool per stage of the pipeline.

Domain: CVA charge monitoring by counterparty, with CDS spreads as a pricing input — the same shape as a full-stack CVA UI built in React/C# in a past role, rebuilt here to demonstrate stage-appropriate AI tool selection rather than CVA methodology itself.

- **Stitch** — dashboard mockup (dense data table + filter panel)
- **Replit Agent** — scaffolds the React app from the design + mock data
- **Storybook** — isolates the grid component, documents its states
- **Playwright** — one E2E test: load, filter, assert
- **CodeRabbit** — AI PR review on a deliberately rough-edged change
- **Notion AI** — turns build notes into a portfolio writeup
- **Module 7 (planned)** — wires the Stitch credit spread screen into the app and closes the design hand-off gaps (issue #32)

See [ROADMAP.md](ROADMAP.md) for the module plan and current status.

Click here https://cva-monitor-grid--bleunguts.replit.app/
<img width="1502" height="658" alt="image" src="https://github.com/user-attachments/assets/292c11d6-a0f3-4880-83a3-ac9ffc28622b" />

