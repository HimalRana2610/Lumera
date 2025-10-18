# 📋 Deployment Environment Variables Checklist

When deploying Lumera AI to any platform (Render, Railway, Heroku, etc.), you need to set these environment variables:

## ✅ Required Environment Variables

### 1. GEMINI_API_KEY
- **Purpose:** API key for Google Gemini AI (report generation)
- **Get it from:** [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Example:** `AIzaSyCiORIgqCKvUwdv-uzafKzIzOq1_omiHjI`
- **Security:** ⚠️ Keep this private! Never commit to GitHub

### 2. MODEL_DOWNLOAD_URL
- **Purpose:** Google Drive link to download the ML model on deployment
- **Get it from:** Upload model to Google Drive → Share → Get link
- **Example:** `https://drive.google.com/file/d/1ABc2DEfg3HIJk4LMN5opQ6rST7uvW8xy/view?usp=sharing`
- **Security:** ✅ Can be public (anyone with link)

## 🔧 Optional Environment Variables

### 3. GEMINI_MODEL
- **Purpose:** Specify which Gemini model to use
- **Default:** `gemini-2.0-flash-exp` (set in code)
- **Example:** `gemini-1.5-pro`
- **When to set:** Only if you want to override the default

---

## 📝 Platform-Specific Setup Instructions

### Render.com

1. Go to your Web Service dashboard
2. Navigate to **Environment** tab
3. Add these variables:

```
GEMINI_API_KEY = your_actual_api_key_here
MODEL_DOWNLOAD_URL = your_google_drive_link_here
```

4. Click **Save Changes**
5. Render will automatically redeploy

### Railway.app

1. Go to your project
2. Click on **Variables** tab
3. Add:

```
GEMINI_API_KEY = your_actual_api_key_here
MODEL_DOWNLOAD_URL = your_google_drive_link_here
```

4. Railway will automatically redeploy

### Heroku

```bash
heroku config:set GEMINI_API_KEY="your_actual_api_key_here"
heroku config:set MODEL_DOWNLOAD_URL="your_google_drive_link_here"
```

### Vercel / Netlify (Frontend only)

Not needed for frontend deployment. These are backend environment variables.

### Docker

In your `docker-compose.yml`:

```yaml
environment:
  - GEMINI_API_KEY=your_actual_api_key_here
  - MODEL_DOWNLOAD_URL=your_google_drive_link_here
```

Or with `docker run`:

```bash
docker run -e GEMINI_API_KEY="your_key" -e MODEL_DOWNLOAD_URL="your_link" your-image
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Store sensitive keys in platform environment variables
- Use `.env` file locally (git-ignored)
- Keep `.env.example` with placeholder values in git
- Rotate API keys periodically

### ❌ DON'T:
- Commit `.env` file to GitHub
- Share API keys publicly
- Hardcode secrets in code
- Use same keys for dev and production (ideally)

---

## 🧪 Testing Environment Variables

### Local Testing

1. Make sure `.env` file exists with:
```properties
GEMINI_API_KEY="your_key"
MODEL_DOWNLOAD_URL="your_google_drive_link"
```

2. Test with:
```bash
cd backend
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print('GEMINI_API_KEY:', 'SET' if os.getenv('GEMINI_API_KEY') else 'NOT SET'); print('MODEL_DOWNLOAD_URL:', 'SET' if os.getenv('MODEL_DOWNLOAD_URL') else 'NOT SET')"
```

### Deployment Testing

Check your deployment platform's logs to ensure:
- ✅ Environment variables are loaded
- ✅ Model downloads successfully on first run
- ✅ Gemini API connection works

---

## 🆘 Troubleshooting

### "GEMINI_API_KEY not set"
- Check environment variables in your deployment platform
- Verify the variable name is exactly `GEMINI_API_KEY` (case-sensitive)
- Redeploy after adding the variable

### "MODEL_DOWNLOAD_URL not set"
- Check environment variables in deployment platform
- Verify the variable name is exactly `MODEL_DOWNLOAD_URL`
- Test the Google Drive link is public and accessible

### "Model download failed"
- Verify Google Drive link is set to "Anyone with the link"
- Check deployment platform has internet access
- Ensure sufficient disk space for model (~200-500MB)

---

## ✅ Final Checklist

Before deploying:

- [ ] `.env` file created locally (from `.env.example`)
- [ ] `GEMINI_API_KEY` set in local `.env`
- [ ] `MODEL_DOWNLOAD_URL` set in local `.env`
- [ ] Model uploaded to Google Drive
- [ ] Google Drive link is public
- [ ] Environment variables configured in deployment platform
- [ ] `.env` is in `.gitignore` (already done ✅)
- [ ] Code pushed to GitHub (without `.env`)
- [ ] Ready to deploy! 🚀

---

**Questions?** Check `MODEL_DEPLOYMENT.md` or `QUICKSTART.md` for more details.
