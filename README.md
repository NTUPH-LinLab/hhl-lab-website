# Hsien-Ho Lin Lab website mirror

This repository contains a static GitHub Pages copy of the public content at
<https://lintblab.weebly.com/>. The deployable website is in `docs/`.

## Refresh the mirror

```powershell
powershell -ExecutionPolicy Bypass -File scripts/mirror-weebly.ps1
```

## Publish

Push the repository to GitHub, then choose **Settings → Pages → Source → GitHub Actions**.
The included workflow publishes `docs/` after every push to `main`.
