# CVA by Counterparty

A compact, client-side counterparty CVA monitor. The table reads the static rows in `src/data/mock-data.json`; search, bucket/date filtering, sorting, and the filtered CVA total run entirely in the browser.

## Run locally on Windows

Install Node.js 22.12 or newer, then open PowerShell at the repository root:

```powershell
Set-Location .\artifacts\cva-monitor
npm install
npm run dev:windows
```

Open `http://localhost:5173` in your browser. Press `Ctrl+C` in PowerShell to stop the development server.

To build and preview the production version:

```powershell
npm run build
npm run preview
```

`PORT` and `BASE_PATH` default to local Vite settings, so no environment-variable setup is needed for Windows development.
