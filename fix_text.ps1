$file = "src\context\LanguageContext.tsx"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
$content = $content.Replace("suites spa privatives", "suites spa privees")
$content = $content.Replace("services d" + [char]8217 + "hotellerie 5 etoiles", "services hoteliers 5 etoiles")
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done"
