# Deploying Lumera on Vercel (frontend + backend)

The code is already prepared for an all-Vercel deployment (see **"What's already done"** at
the bottom). You deploy the repo as **two Vercel projects** — one for the frontend, one for
the backend — and connect them with environment variables. That's it.

```
Phone/Browser ──HTTPS──> Vercel: lumera-frontend (Next.js)
                              │  NEXT_PUBLIC_API_BASE_URL
                              ▼
                         Vercel: lumera-backend (FastAPI serverless) ──> HF Space + Gemini
```

---

## Prerequisite — push the code to GitHub

Vercel builds from GitHub, so commit and push first:

```bash
git add -A
git commit -m "Serverless backend + all-Vercel deployment"
git push origin main
```

You'll also want a **Google Gemini API key** ready.

---

## Step 1 — Deploy the BACKEND project

1. [Vercel dashboard](https://vercel.com/dashboard) → **Add New → Project** → import this repo.
2. **Project Name:** `lumera-backend`
3. **Root Directory:** `backend`   ← important
4. **Framework Preset:** **Other**
5. Leave Build/Output/Install commands empty (the included `vercel.json` handles it).
6. Expand **Environment Variables** and add:

   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | your Gemini API key |
   | `GEMINI_MODEL` | `gemini-2.5-flash-lite` *(optional)* |
   | `HF_API_URL` | *(optional — leave unset to use the default Space)* |
   | `FRONTEND_ORIGINS` | leave empty for now (set in Step 3) |

7. Click **Deploy**.
8. Copy the resulting URL, e.g. `https://lumera-backend.vercel.app`.
9. **Test:** open `https://lumera-backend.vercel.app/health` → you should see
   `{"status":"healthy", ...}`.

---

## Step 2 — Deploy the FRONTEND project

1. **Add New → Project** → import the **same** repo again.
2. **Project Name:** `lumera-frontend`
3. **Root Directory:** `frontend`   ← important
4. **Framework Preset:** **Next.js** (auto-detected).
5. Add **Environment Variable**:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | your backend URL from Step 1, e.g. `https://lumera-backend.vercel.app` |

6. Click **Deploy**.
7. Copy the frontend URL, e.g. `https://lumera-frontend.vercel.app`.

---

## Step 3 — Connect them (CORS)

1. Open the **`lumera-backend`** project → **Settings → Environment Variables**.
2. Set:

   | Key | Value |
   |---|---|
   | `FRONTEND_ORIGINS` | your frontend URL from Step 2, e.g. `https://lumera-frontend.vercel.app` |

3. Go to the backend's **Deployments** tab → **⋯ → Redeploy** so it picks up the new value.

---

## Step 4 — Verify

1. Open the **frontend URL on your phone** (it's HTTPS, so the **camera works**).
2. Capture or upload a photo → **Generate Summary** → **Get Detailed Analysis**.
3. The analysis summary appears, and the detailed report opens in a new tab.

Done. 🎉

---

## Updating later

- Push to `main` → both Vercel projects redeploy automatically.
- If you change `NEXT_PUBLIC_API_BASE_URL`, you must **redeploy the frontend** (that value is
  baked in at build time).

---

## Good to know (limitations of serverless)

| Area | Behavior |
|---|---|
| Uploaded images / reports | Not stored — processed per request; the report is returned inline and opens in a new tab. |
| `/consent` | Acknowledges consent but does **not** store images (serverless has no disk). To collect images, wire it to Vercel Blob / S3. |
| Cold starts | First request after idle is slow while the Python function + OpenCV load. |
| Function timeout | Capped at 60s — the HF Space + Gemini calls must finish within it. |
| Bundle size | The backend uses `opencv-python-headless` to stay smaller; if a build ever fails on size (250 MB limit), move the backend to Render instead (it runs the same code). |

---

## What's already done for you (code changes)

You don't need to touch the code — these were already applied and tested locally:

- **Stateless backend** (`backend/app.py`): no disk writes; returns the report as inline
  HTML and the cropped face as a base64 data URL.
- **Self-contained reports** (`backend/Gemini.py`): the logo (`backend/assets/logo_new.jpg`)
  and the cropped image are embedded as base64, so reports need no static file serving.
- **Vercel entry point**: `backend/vercel.json` + `backend/api/index.py`.
- **Dependencies** (`backend/requirements.txt`): `opencv-python-headless`, UTF-8 encoded.
- **Frontend** (`frontend/src/app/analysis/page.tsx`): opens the inline report via a Blob;
  `frontend/src/app/lib/api.ts` reads the backend URL from `NEXT_PUBLIC_API_BASE_URL`.
- **CORS** (`backend/app.py`): production origins come from `FRONTEND_ORIGINS`.
