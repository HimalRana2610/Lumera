# Deploying Lumera

This guide deploys Lumera with:

- **Frontend (Next.js) → Vercel** — served over HTTPS, so the **mobile camera works**.
- **Backend (FastAPI) → Render** — a persistent web service that fits the app as-is
  (it saves/serves images and reports, which Vercel's serverless functions can't do).

Both get HTTPS, so there's no mixed-content blocking between them.

```
 Mobile / Browser ──HTTPS──> Vercel (frontend)
                                 │  calls NEXT_PUBLIC_API_BASE_URL
                                 ▼
                             Render (FastAPI backend) ──> Hugging Face Space + Gemini
```

---

## Prerequisites

- A **GitHub** account with this repo pushed (Vercel & Render deploy from GitHub).
- A **Vercel** account and a **Render** account (both have free tiers).
- A **Google Gemini API key**.

> **Note:** Both platforms build from your GitHub repo, so commit and push your latest
> code first. Your secrets stay safe — `backend/.env` and `frontend/.env.local` are
> git-ignored and are **not** used in production; you set those values as environment
> variables in the Vercel/Render dashboards instead.

---

## Step 0 — Push the latest code to GitHub

```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

---

## Step 1 — Delete the old Render deployment

1. Go to the [Render dashboard](https://dashboard.render.com/).
2. Open the old **`lumera-frontend`** service.
3. **Settings → Delete Service** (type the name to confirm).
4. (Optional) Do the same for any old backend service if you want a fully fresh start.

---

## Step 2 — Required backend change (OpenCV on Linux)

Render's Linux runtime doesn't ship the system library `libGL.so.1` that `opencv-python`
needs, so it fails to import. Switch to the headless build (identical API, no GUI deps —
also fine locally since the app never opens windows).

In **`backend/requirements.txt`**, change:

```diff
- opencv-python==4.13.0.92
+ opencv-python-headless==4.13.0.92
```

Commit and push this change.

---

## Step 3 — Deploy the backend to Render

1. Render dashboard → **New + → Web Service** → connect this GitHub repo.
2. Configure:
   | Setting | Value |
   |---|---|
   | **Name** | `lumera-backend` (your choice) |
   | **Root Directory** | `backend` |
   | **Runtime** | Python 3 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
   | **Instance Type** | Free (or paid for no cold starts) |
3. Add **Environment Variables** (Advanced → Add Environment Variable):
   | Key | Value |
   |---|---|
   | `GEMINI_API_KEY` | your Gemini API key |
   | `GEMINI_MODEL` | `gemini-2.5-flash-lite` *(optional)* |
   | `HF_API_URL` | *(optional — defaults to the bundled Space URL)* |
   | `FRONTEND_ORIGINS` | leave blank for now; set in Step 5 |
   | `PYTHON_VERSION` | `3.12.8` |
4. Click **Create Web Service** and wait for the build to finish.
5. Copy the service URL, e.g. **`https://lumera-backend.onrender.com`**.
6. Verify: open `https://lumera-backend.onrender.com/health` → `{"status":"healthy", ...}`.

> **Free-tier note:** the service sleeps after ~15 min idle; the first request after
> waking takes ~50s (cold start). Uploaded images/reports live on the instance's disk
> and are cleared on redeploy/restart — fine for this app, since reports are transient.

---

## Step 4 — Deploy the frontend to Vercel

1. [Vercel dashboard](https://vercel.com/dashboard) → **Add New → Project** → import this repo.
2. Configure:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | Next.js *(auto-detected)* |
   | **Build / Install** | defaults (`next build` / `npm install`) |
3. Add **Environment Variable**:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | your Render backend URL, e.g. `https://lumera-backend.onrender.com` |
4. Click **Deploy** and wait for it to finish.
5. Copy the production URL, e.g. **`https://lumera-xxxx.vercel.app`**.

> `NEXT_PUBLIC_*` variables are baked in at **build time**. If you change the backend URL
> later, update the env var **and redeploy** the frontend.

---

## Step 5 — Connect them (CORS)

The backend only accepts requests from origins it knows about.

1. Render dashboard → your backend service → **Environment**.
2. Set:
   | Key | Value |
   |---|---|
   | `FRONTEND_ORIGINS` | your Vercel URL, e.g. `https://lumera-xxxx.vercel.app` |
3. Save — Render redeploys automatically. (For multiple origins, comma-separate them.)

---

## Step 6 — Verify on mobile

1. Open the **Vercel URL** on your phone (it's HTTPS).
2. Go to **Analyze → Camera Capture** → **Allow** the camera prompt → the live camera
   should appear (HTTPS satisfies the browser's secure-context requirement).
3. Capture a photo and run an analysis → you should get a summary and report.

---

## Troubleshooting

| Symptom | Cause / Fix |
|---|---|
| Camera is a black box on mobile | The page must be HTTPS. Vercel is HTTPS by default — make sure you opened the `vercel.app` URL, not a `http://<LAN-IP>` address. |
| Browser console: CORS error | `FRONTEND_ORIGINS` on Render must exactly match your Vercel URL (scheme + host, no trailing slash). Redeploy the backend after changing it. |
| API calls fail / "Network Error" | `NEXT_PUBLIC_API_BASE_URL` on Vercel must point to the Render backend; redeploy the frontend after changing it. |
| Backend build fails on `cv2` / `libGL.so.1` | You skipped Step 2 — use `opencv-python-headless`. |
| First request very slow | Render free-tier cold start (~50s). Upgrade the instance or hit `/health` to warm it. |
| Report shows fallback text, not Gemini | Gemini quota hit or `GEMINI_API_KEY` not set on Render. Check the key and free-tier limits. |

---

## Custom domains (optional)

- **Vercel:** Project → Settings → Domains → add your domain.
- **Render:** Service → Settings → Custom Domains.
- After adding a frontend domain, add it to the backend's `FRONTEND_ORIGINS` too.
