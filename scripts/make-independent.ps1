param([string]$SiteRoot = "docs")

$ErrorActionPreference = "Stop"
$nav = @(
  @{ Label = 'Home'; File = 'index.html' },
  @{ Label = 'Profile'; File = 'profile.html' },
  @{ Label = 'Publications'; File = 'publications.html' },
  @{ Label = 'Research Topics'; File = 'research-topics.html' },
  @{ Label = 'Group Members'; File = 'group-members.html' },
  @{ Label = 'Source Code'; File = 'source-code-package-for-download.html' },
  @{ Label = 'News'; File = 'news.html' },
  @{ Label = 'Speeches & Courses'; File = 'speeches-and-courses.html' },
  @{ Label = 'Posters'; File = 'posters.html' }
)

$rootPath = (Resolve-Path $SiteRoot).Path
Get-ChildItem $SiteRoot -Recurse -Filter '*.html' | ForEach-Object {
  $source = [IO.File]::ReadAllText($_.FullName)
  $titleMatch = [regex]::Match($source, '<title>(?<title>.*?)</title>', 'Singleline,IgnoreCase')
  $title = if ($titleMatch.Success) { [Net.WebUtility]::HtmlDecode($titleMatch.Groups['title'].Value.Trim()) } else { 'Hsien-Ho Lin Lab' }
  $contentMatch = [regex]::Match($source, '<div id="content">(?<content>.*?)<div id="footer">', 'Singleline,IgnoreCase')
  if (-not $contentMatch.Success) { Write-Warning "Content not found: $($_.FullName)"; return }

  $relative = $_.FullName.Substring($rootPath.Length).TrimStart('\')
  $depth = ($relative -split '[\\/]').Count - 1
  $prefix = if ($depth -gt 0) { '../' * $depth } else { '' }
  $current = if ($relative -match 'index\.html$' -and $depth -gt 0) { 'news.html' } else { $relative -replace '\\','/' }
  $content = $contentMatch.Groups['content'].Value
  $content = $content -replace 'https?://lintblab\.weebly\.com/uploads/', ($prefix + 'uploads/')
  $content = $content -replace 'https?://lintblab\.weebly\.com/', $prefix
  $content = [regex]::Replace($content, '<script\b[^>]*>.*?</script>', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '<iframe\b[^>]*(?:weebly|editmysite)[^>]*>.*?</iframe>', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '<img\b[^>]*(?:weebly|editmysite)[^>]*>', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '<div\b[^>]*class=["''][^"'']*powr-[^"'']*["''][^>]*>.*?</div>', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '\s+onclick="[^"]*"', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '<div class="wsite-search-element[^>]*>.*?</form>\s*</div>', '', 'Singleline,IgnoreCase')
  $content = [regex]::Replace($content, '//cdn2\.editmysite\.com/images/editor/theme-background/stock/[^&"'']+', ($prefix + 'uploads/9/6/2/6/9626107/background-images/330727398.jpg'), 'IgnoreCase')

  $navHtml = ($nav | ForEach-Object {
    $active = if ($current -eq $_.File) { ' class="active" aria-current="page"' } else { '' }
    "<a href=`"$prefix$($_.File)`"$active>$($_.Label)</a>"
  }) -join "`n          "

  $description = 'Epidemiology and preventive medicine research at National Taiwan University, led by Professor Hsien-Ho Lin.'
  $html = @"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="$description">
  <meta name="theme-color" content="#0b4f6c">
  <title>$title | Hsien-Ho Lin Lab</title>
  <link rel="stylesheet" href="${prefix}assets/site.css">
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${prefix}index.html">
        <span class="brand-mark">HHL</span>
        <span><strong>Hsien-Ho Lin Lab</strong><small>National Taiwan University</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
          $navHtml
      </nav>
    </div>
  </header>
  <main id="content">
    $content
  </main>
  <footer class="site-footer">
    <div><strong>Hsien-Ho Lin Lab</strong><br>Institute of Epidemiology and Preventive Medicine, National Taiwan University</div>
    <a href="mailto:hsienho@ntu.edu.tw">hsienho@ntu.edu.tw</a>
  </footer>
  <script src="${prefix}assets/site.js"></script>
</body>
</html>
"@
  [IO.File]::WriteAllText($_.FullName, $html, [Text.UTF8Encoding]::new($false))
}

# The public Group Members page was only an Elfsight placeholder. Replace it
# with a self-contained, filterable roster captured from the published widget.
$membersPath = Join-Path $SiteRoot 'group-members.html'
$archivedMembersPath = Join-Path $SiteRoot 'group-members_old.html'
if ((Test-Path $membersPath) -and (Test-Path $archivedMembersPath)) {
  $membersPage = [IO.File]::ReadAllText((Resolve-Path $membersPath))
  $memberSectionPath = Join-Path $PSScriptRoot 'group-members-section.html'
  if (Test-Path $memberSectionPath) {
    $memberSection = [IO.File]::ReadAllText((Resolve-Path $memberSectionPath))
    $replacement = '<main id="content">' + $memberSection + '</main>'
    $membersPage = [regex]::Replace($membersPage, '<main id="content">.*?</main>', [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $replacement }, 'Singleline,IgnoreCase')
    $membersPage = $membersPage -replace '<script src="assets/site.js"></script>', '<script src="assets/site.js"></script><script src="assets/members.js"></script>'
    [IO.File]::WriteAllText((Resolve-Path $membersPath), $membersPage, [Text.UTF8Encoding]::new($false))
  }
}

Write-Host "Converted pages to a standalone GitHub Pages site."
