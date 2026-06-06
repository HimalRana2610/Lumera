# LUMÉRA AI

LUMÉRA AI is a privacy-first facial attribute analysis web app. A user uploads (or captures via webcam) a photo; the backend detects and crops the face, runs it through a CNN-based attribute model, and uses Google Gemini to turn the raw predictions into a friendly summary, skincare/grooming recommendations, and a styled HTML report.

## How it works

```
                 ┌──────────────────────────────────────────────────────────┐
  Browser        │                       FastAPI backend                     │
 (Next.js) ──────┤                                                           │
   upload /      │  1. Save image        →  static/user_images/             │
   webcam        │  2. Crop face (OpenCV Haar cascade)  → temp.py           │
                 │  3. Predict attributes (Hugging Face Space) → test.py     │
                 │  4. Summary + recommendations (Gemini) → Gemini.py        │
                 │  5. Render HTML report →  static/reports/                 │
                 └──────────────────────────────────────────────────────────┘
```

The browser shows the cropped face and AI summary. If the user consents (to allow their image to be used for model improvement), the cropped image is copied to `static/accepted/` and the full HTML report opens in a new tab.

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, axios, react-webcam |
| Backend  | FastAPI, Uvicorn, OpenCV (face crop), Google Generative AI (Gemini) |
| Model    | CNN attribute classifier hosted on a Hugging Face Space (called over HTTP) |

## Repository layout

```
Lumera/
├── backend/
│   ├── app.py                 # FastAPI app & endpoints (/predict, /consent, /health)
│   ├── temp.py                # crop_face() — OpenCV Haar-cascade face detection
│   ├── test.py                # test_api() — calls the Hugging Face prediction Space
│   ├── Gemini.py              # Gemini config, prompts, summary/content & HTML report
│   ├── attribute_mapping.json # human-readable descriptions for each model attribute
│   ├── example_predictions.json # sample model output (for local Gemini.py testing)
│   ├── requirements.txt
│   ├── .env.example
│   └── static/                # runtime-generated (git-ignored): user_images, accepted, reports
└── frontend/
    └── src/app/               # Next.js App Router pages & components
```

## Prerequisites

- Python 3.11+
- Node.js 18+ (Node 20+ recommended)
- A Google Gemini API key (https://aistudio.google.com/app/apikey)

## Backend setup

```bash
cd backend

# 1. Create & activate a virtual environment
python -m venv venv
# Windows (PowerShell):
venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
copy .env.example .env        # Windows  (use `cp` on macOS/Linux)
# then edit .env and set GEMINI_API_KEY=your_key
```

Run the API (defaults to port 8000):

```bash
uvicorn app:app --reload
```

Verify it's up: open http://localhost:8000/health → `{"status":"healthy", ...}`.

### Environment variables (`backend/.env`)

| Variable          | Required | Description |
|-------------------|----------|-------------|
| `GEMINI_API_KEY`  | Yes      | Google Gemini API key used to generate summaries & reports. If unset, the backend falls back to a built-in rules-based generator. |
| `GEMINI_MODEL`    | No       | Override the Gemini model (default `gemini-2.5-flash`). |
| `HF_API_URL`      | No       | Hugging Face prediction Space endpoint (image → attribute JSON). Defaults to the bundled Space URL. |
| `HF_API_SECRET_KEY` | No     | `x-api-key` secret for the Hugging Face Space, only if the Space requires one. |
| `FRONTEND_ORIGINS` | No      | Comma-separated production frontend origins allowed by CORS (localhost is always allowed for dev). |
| `PORT`            | No       | Port for Uvicorn when run via `python app.py` (default `8000`). |

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

### Environment variables (`frontend/.env.local`)

Copy `frontend/.env.example` to `frontend/.env.local` and set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL the frontend calls. Local dev: `http://localhost:8000`; production: your deployed backend URL. Falls back to `http://localhost:8000` if unset. |

## API endpoints

| Method | Path        | Description |
|--------|-------------|-------------|
| `POST` | `/predict`  | Multipart `file` upload. Crops the face, predicts attributes, returns summary + recommendations + report URL. |
| `POST` | `/consent`  | JSON `{ "filename": "<image>.jpg" }`. Records consent by copying the image to `static/accepted/`. |
| `GET`  | `/health`   | Health check. |

## Privacy

- Uploaded images and generated reports live under `backend/static/` and are **git-ignored** — they are never committed.
- A user's image is only retained for model improvement after explicit consent (the `/consent` flow).

## Deployment notes

The app is designed for platforms like Render. All configuration is via environment variables — set them in the platform's settings rather than hardcoding:

- **Backend:** `GEMINI_API_KEY`, and `FRONTEND_ORIGINS` = your deployed frontend URL (so CORS allows it). Optionally `GEMINI_MODEL`, `HF_API_URL`, `HF_API_SECRET_KEY`.
- **Frontend:** `NEXT_PUBLIC_API_BASE_URL` = your deployed backend URL.
