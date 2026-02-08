# 1. Set Python Path
$env:QUARTO_PYTHON = "D:\Python\Python313\python.exe"

# 2. Render Book (Step 1)
Write-Host "Step 1: Rendering Book..." -ForegroundColor Cyan
quarto render
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Book Render FAILED! Aborting." -ForegroundColor Red
    exit 
}

# 3. Render Slides (Step 2)
# This forces Quarto to look into the slides folder
Write-Host "Step 2: Rendering Slides..." -ForegroundColor Magenta
quarto render slides/
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Slides Render FAILED! Aborting." -ForegroundColor Red
    exit 
}

# 4. Git Push
Write-Host "Step 3: Pushing to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Auto-deploy: Update book and slides"
git push origin main

Write-Host "SUCCESS! Your site is live." -ForegroundColor Green