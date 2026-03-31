$ErrorActionPreference = 'Stop'
$base = "E:\Github\Data-collection-and-preprocessing-2027-Spring\slides"

# Get all lecture QMD files
$qmdFiles = Get-ChildItem -Path $base -Filter "*.qmd" | Where-Object { $_.Name -match "^lecture-\d" }

Write-Host "Found $($qmdFiles.Count) lecture files to render" -ForegroundColor Cyan

foreach ($file in $qmdFiles) {
    $pptxName = $file.BaseName + ".pptx"
    $pptxPath = Join-Path $base $pptxName
    $qmdPath = $file.FullName

    Write-Host "Rendering $($file.Name) -> $pptxName" -ForegroundColor Yellow

    try {
        # Render to PPTX using the QMD file
        $output = quarto render $qmdPath --to pptx 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Created $pptxName" -ForegroundColor Green
        } else {
            Write-Host "  ✗ Failed with exit code $LASTEXITCODE" -ForegroundColor Red
            Write-Host $output
        }
    }
    catch {
        Write-Host "  ✗ Error: $_" -ForegroundColor Red
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan
