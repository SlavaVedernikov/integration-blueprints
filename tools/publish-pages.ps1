$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceFile = Join-Path -Path $scriptDir -ChildPath ..\templates\explore\index.html -Resolve
$destinationDir = Join-Path -Path $scriptDir -ChildPath ..\explore -Resolve
$urlsFile = Join-Path -Path $scriptDir -ChildPath ..\data\urls.json -Resolve
$urls = Get-Content -Raw -Path $urlsFile | ConvertFrom-Json

Write-Host "Script Dir: $scriptDir"
Write-Host "Source File: $sourceFile"
Write-Host "Destination Dir: $destinationDir"
Write-Host "Urls File: $urlsFile"

foreach ($i in $urls.data)
{
    $destinationSubDir = Join-Path -Path $destinationDir -ChildPath $i
    Write-Host "Destination Sub Dir:  $destinationSubDir"
    if (!(Test-Path -Path $destinationSubDir)) {New-Item $destinationSubDir -Type Directory}
    Copy-Item $sourceFile -Destination $destinationSubDir
}

Read-Host -Prompt "Press any key to exit..."