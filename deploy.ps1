# 1. Set Python Path
$env:QUARTO_PYTHON = "D:\Python\Python313\python.exe"

# 2. Render Website
Write-Host "Rendering website..." -ForegroundColor Cyan
quarto render

# 3. Check for Errors
if ($LASTEXITCODE -ne 0) {
    Write-Host "Render FAILED! Deployment aborted." -ForegroundColor Red
    exit
}

# 4. Git Commit
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Auto-deploy: Update course content"

# 5. Push
git push origin main

Write-Host "SUCCESS! Your site will be live in 1 minute." -ForegroundColor Green