# H3 Gap Scanner
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$qmdFiles = Get-ChildItem -Path "E:\Github\Data-collection-and-preprocessing-2027-Spring" -Filter "*.qmd" -Recurse
$results = @()

foreach ($file in $qmdFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Split by ### 
    $sections = $content -split '(?m)^### '
    
    # Skip first part (file header)
    for ($i = 1; $i -lt $sections.Count; $i++) {
        $section = $sections[$i]
        $lines = $section -split "`n"
        $h3Title = $lines[0].Trim()
        
        # Extract body (remove title line)
        $body = ($lines[1..($lines.Count-1)] -join "`n")
        
        # Remove ::: blocks
        $body = $body -replace '(?s):::.*?:::', ''
        
        # Remove ``` code blocks
        $body = $body -replace '(?s)```.*?```', ''
        
        # Remove > quote lines
        $body = $body -replace '(?m)^>.*$', ''
        
        # Count Chinese characters
        $chineseChars = ([regex]::Matches($body, '[\u4e00-\u9fa5]')).Count
        
        # Count code blocks (in original section)
        $codeBlocks = ([regex]::Matches($section, '```')).Count / 2
        
        # Classify problem type
        $problemType = if ($chineseChars -lt 30) { "STUB" } 
                      elseif ($chineseChars -lt 500) { "SHORT" } 
                      else { "OK" }
        
        # Assign priority
        $priority = if ($problemType -eq "STUB") { "P0" }
                   elseif ($problemType -eq "SHORT" -and $codeBlocks -eq 0) { "P1" }
                   else { "P2" }
        
        # Replace comma with Chinese comma in H3 title
        $h3TitleClean = $h3Title -replace ',', [char]0xFF0C
        
        $results += [PSCustomObject]@{
            FileName = $file.Name
            H3Title = $h3TitleClean
            ChineseChars = $chineseChars
            CodeBlocks = [int]$codeBlocks
            ProblemType = $problemType
            Priority = $priority
        }
    }
}

# Sort: P0 -> P1 -> P2, then by ChineseChars ascending
$sortedResults = $results | Sort-Object @{Expression={
    switch ($_.Priority) {
        "P0" { 0 }
        "P1" { 1 }
        "P2" { 2 }
    }
}}, ChineseChars

# Export CSV
$csvPath = "E:\Github\Data-collection-and-preprocessing-2027-Spring\gap-report.csv"
$sortedResults | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8

# Statistics
$totalH3 = $sortedResults.Count
$stubCount = ($sortedResults | Where-Object { $_.ProblemType -eq "STUB" }).Count
$shortCount = ($sortedResults | Where-Object { $_.ProblemType -eq "SHORT" }).Count
$okCount = ($sortedResults | Where-Object { $_.ProblemType -eq "OK" }).Count
$p0Count = ($sortedResults | Where-Object { $_.Priority -eq "P0" }).Count
$p1Count = ($sortedResults | Where-Object { $_.Priority -eq "P1" }).Count
$p2Count = ($sortedResults | Where-Object { $_.Priority -eq "P2" }).Count

Write-Host "Done!"
Write-Host ""
Write-Host "Statistics:"
Write-Host "  Total H3: $totalH3"
Write-Host ""
Write-Host "  Problem Types:"
Write-Host "    STUB (<30 chars): $stubCount"
Write-Host "    SHORT (30-500 chars): $shortCount"
Write-Host "    OK (>500 chars): $okCount"
Write-Host ""
Write-Host "  Priorities:"
Write-Host "    P0 (STUB): $p0Count"
Write-Host "    P1 (SHORT+no code): $p1Count"
Write-Host "    P2 (others): $p2Count"
Write-Host ""
Write-Host "CSV file: $csvPath"
