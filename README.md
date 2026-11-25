# Aslam Alphonas – AV Solutions Professional Portfolio

React + Vite + Tailwind CSS + Framer Motion + Lucide React. All content comes from the CV (`src/data.js`).

## Run locally (VS Code)
1. Install Node.js 18+ from https://nodejs.org
2. Open this folder in VS Code (File > Open Folder), then open the terminal (Ctrl+`).
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL shown (usually http://localhost:5173).

Production build: `npm run build` (output in `dist/`), preview with `npm run preview`.

## Edit content
Everything (experience, skills, brands, certifications, contact) lives in `src/data.js`.
The CV file is `public/Aslam_Alphonas_CV.pdf` (replace it to update the download).
No LinkedIn button is included because no profile URL was supplied. To add one, put the real URL in `data.js` and a link in `Contact.jsx`.

## Deploy on Vercel
1. Push the project to a GitHub repository.
2. On https://vercel.com choose Add New > Project, import the repo.
3. Framework preset: Vite. Build command `npm run build`, output `dist`. Click Deploy.

## Deploy on Render
1. Push the project to GitHub.
2. On https://render.com choose New > Static Site and connect the repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Click Create Static Site.

## Run with Flask (app.py)
`app.py` serves the production build from `dist/`.
```bash
npm install
npm run build
pip install -r requirements.txt
python app.py        # http://localhost:5000
```

### Deploy app.py on Render (Web Service)
**Easiest: Blueprint (uses `render.yaml`)**
1. Push the project to a GitHub repository (do not upload `node_modules` or `dist`; `.gitignore` already skips them).
2. On https://render.com choose New > Blueprint, connect the repo and click Apply.

**Manual setup**
1. New > Web Service, connect the repo, Runtime: Python 3.
2. Build command: `npm install && npm run build && pip install -r requirements.txt`
3. Start command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2`
4. Health check path: `/healthz`
5. Environment variables: `PYTHON_VERSION` = `3.12.3`, `NODE_VERSION` = `20.18.0`
6. Click Create Web Service. The free plan sleeps when idle, so the first visit can take about 30-60 seconds.

Note: `.vercelignore` stops Vercel from treating `app.py` as a Python app. Vercel only needs the React site.
