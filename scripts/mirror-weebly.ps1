param([string]$Destination = "docs")

$ErrorActionPreference = "Stop"
$base = "https://lintblab.weebly.com"
$pages = @(
  "index.html", "profile.html", "publications.html", "research-topics.html",
  "group-members.html", "source-code-package-for-download.html", "news.html",
  "speeches-and-courses.html", "posters.html", "research-projects.html",
  "intervention-of-tuberculosis.html", "burden-of-disease.html",
  "risk-factor-of-tuberculosis.html", "new-page.html", "others.html",
  "group-members_old.html", "precision-epidemiology-of-tuberculosis.html",
  "news/3982161", "news/8472814", "news/8943682",
  "news/15576pm25-the-news-lens", "news/3569527", "news/9775872",
  "news/us-medical-institute-becomes-a-political-tool-for-china-to-bully-taiwan-new-bloom",
  "news/6910514"
)

New-Item -ItemType Directory -Force -Path $Destination | Out-Null
$assetUrls = [System.Collections.Generic.HashSet[string]]::new()

foreach ($page in $pages) {
  $uri = "$base/$page"
  $target = Join-Path $Destination $page
  if (-not [IO.Path]::GetExtension($target)) { $target = Join-Path $target 'index.html' }
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
  $response = Invoke-WebRequest -Uri $uri -UseBasicParsing
  $html = $response.Content -replace '<script[^>]+src="//', '<script src="https://' -replace 'href="//', 'href="https://' -replace 'src="//', 'src="https://'
  $html = [regex]::Replace($html, '<a href="/cdn-cgi/l/email-protection[^>]*data-cfemail="[^"]+"[^>]*>.*?</a>', '<a href="mailto:hsienho@ntu.edu.tw">hsienho@ntu.edu.tw</a>')
  foreach ($match in [regex]::Matches($html, '(?<u>/(?:uploads|files|cdn-cgi)/[^"''&?#\s\)]+)')) {
    [void]$assetUrls.Add($match.Groups['u'].Value)
  }
  $depth = ((Split-Path ($target.Substring($Destination.Length).TrimStart('\', '/'))) -split '[\\/]').Count
  if ((Split-Path $target) -eq $Destination) { $depth = 0 }
  $prefix = if ($depth -gt 0) { ('../' * $depth) } else { '' }
  $html = [regex]::Replace($html, '(["''])/(?!/)', ('$1' + $prefix))
  $html = $html -replace '&quot;/(?!/)', ("&quot;" + $prefix)
  [IO.File]::WriteAllText((Join-Path (Get-Location) $target), $html, [Text.UTF8Encoding]::new($false))
}

foreach ($asset in $assetUrls) {
  $relative = $asset.TrimStart('/') -replace '/', [IO.Path]::DirectorySeparatorChar
  $target = Join-Path $Destination $relative
  New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null
  try { Invoke-WebRequest -Uri "$base$asset" -OutFile $target -UseBasicParsing }
  catch { Write-Warning "Could not download $asset" }
}

Set-Content -Path (Join-Path $Destination '.nojekyll') -Value '' -NoNewline
Write-Host "Mirrored $($pages.Count) pages and $($assetUrls.Count) local assets into $Destination"
