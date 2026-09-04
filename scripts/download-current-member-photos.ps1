$ErrorActionPreference = 'Stop'
$target = Join-Path $PSScriptRoot '..\docs\assets\members'
New-Item -ItemType Directory -Force -Path $target | Out-Null
$photos = @{
  '01.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/496deab1-3392-4606-b818-18e896569dfe/%E6%9B%BE%E6%80%A1%E8%93%81.jpg'
  '02.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/93f16169-773c-448b-b65f-da3608ea033b/%E9%A6%AC%E6%85%B6%E8%93%89.jpg'
  '03.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/6a4add96-0280-46c7-ad87-1afc878ebbc8/yoseph-headshot.jpg'
  '05.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/9e188917-bd68-4078-8b4c-9e41a65a7ac4/Johnson-Wong.jpg'
  '06.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/3a3a175f-7127-49d4-8fce-847e35c694a4/IMG_4017.jpg'
  '07.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/9e9633b4-4dc7-413b-b601-c83cecb872bb/photo.jpg'
  '08.jpg'='https://files.elfsightcdn.com/eafe4a4d-3436-495d-b748-5bdce62d911d/5dd86205-b9cd-4d61-a8fe-ace4e8750528/IMG_1931.jpg'
  '09.jpg'='https://files.elfsight.com/storage/45825056-07e9-4121-a728-a7db34d83c21/3c2decfe-00d4-4a67-8093-4d3ec76d89cc/.jpg'
  '10.jpg'='https://files.elfsight.com/storage/45825056-07e9-4121-a728-a7db34d83c21/8fe9e992-79bc-4ddb-b8ed-357a80f4a005.png'
  '11.jpg'='https://files.elfsight.com/storage/45825056-07e9-4121-a728-a7db34d83c21/d9c39e45-42a7-4f5b-b594-2da157ee2918.jpg'
  '12.jpg'='https://files.elfsight.com/storage/45825056-07e9-4121-a728-a7db34d83c21/7785d171-ab0d-46e7-af59-8f7a14871cca.jpg'
}
foreach ($item in $photos.GetEnumerator()) { Invoke-WebRequest -Uri $item.Value -OutFile (Join-Path $target $item.Key) -UseBasicParsing }
Write-Host "Downloaded $($photos.Count) current-member photos."
