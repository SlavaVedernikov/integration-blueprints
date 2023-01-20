$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceFile = Join-Path -Path $scriptDir -ChildPath ..\templates\explore\index.html -Resolve
$destinationDir = Join-Path -Path $scriptDir -ChildPath ..\explore -Resolve
$urlsFile = Join-Path -Path $scriptDir -ChildPath ..\data\urls.json -Resolve
$urls = Get-Content -Raw -Path $urlsFile | ConvertFrom-Json

Write-Host "Script Dir: $scriptDir"
Write-Host "Source File: $sourceFile"
Write-Host "Destination Dir: $destinationDir"
Write-Host "Urls File: $urlsFile"

$userInput = Read-Host -Prompt "All folders and files will be deleted in $destinationDir. Enter Y to confirm or any other key to skip: "
if($userInput -eq "Y")
{
    Remove-Item -Path $destinationDir -Recurse -Force
    New-Item $destinationDir -Type Directory
}

$userInput = Read-Host -Prompt "Would you like to continue publishing. Enter Y to confirm or any other key to skip: "

if($userInput -eq "Y")
{
    foreach ($i in $urls.data)
    {
        $destinationSubDir = Join-Path -Path $destinationDir -ChildPath $i
        Write-Host "Destination Sub Dir:  $destinationSubDir"
        if (!(Test-Path -Path $destinationSubDir)) {New-Item $destinationSubDir -Type Directory}
        Copy-Item $sourceFile -Destination $destinationSubDir
    }
}

Read-Host -Prompt "Press any key to exit..."