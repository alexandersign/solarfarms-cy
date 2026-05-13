<#
.SYNOPSIS
  Copies repo `parks-for-sale` to Google Drive `SOLARFARMS` (full mirror + parks-by-deal layout).

.DESCRIPTION
  Destination default: `L:\My Drive\SOLARFARMS` (Google Drive for Business stream).
  Creates:
    - parks-for-sale/     — exact mirror of repo folder
    - parks-by-deal/      — same files grouped under numbered deal folders + 00-Root-misc

.PARAMETER GoogleDriveSolarfarmsRoot
  Override root, e.g. `G:\My Drive\SOLARFARMS`

.EXAMPLE
  .\scripts\sync-parks-for-sale-to-google-solarfarms.ps1
  .\scripts\sync-parks-for-sale-to-google-solarfarms.ps1 -GoogleDriveSolarfarmsRoot "G:\My Drive\SOLARFARMS"
#>
[CmdletBinding()]
param(
  [string] $GoogleDriveSolarfarmsRoot = "L:\My Drive\SOLARFARMS"
)

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$src = Join-Path $repoRoot "parks-for-sale"
if (-not (Test-Path $src)) { throw "Source not found: $src" }
if (-not (Test-Path $GoogleDriveSolarfarmsRoot)) {
  throw "Google Drive SOLARFARMS root not found: $GoogleDriveSolarfarmsRoot`nMount Drive or pass -GoogleDriveSolarfarmsRoot."
}

$full = Join-Path $GoogleDriveSolarfarmsRoot "parks-for-sale"
$org  = Join-Path $GoogleDriveSolarfarmsRoot "parks-by-deal"
New-Item -ItemType Directory -Force -Path $full, $org | Out-Null

Write-Host "Mirroring -> $full"
robocopy $src $full /E /COPY:DAT /DCOPY:DAT /R:3 /W:5 /MT:8 /NP
if ($LASTEXITCODE -ge 8) { throw "robocopy mirror failed with exit $LASTEXITCODE" }

$map = @(
  @{ Src = "Jonathan 10.4";            Dst = "01-Vanalio-Jonathan-10.4-DD" },
  @{ Src = "Ragelia_George-Balatsos"; Dst = "02-Ragelia-George-Balatsos-portfolio" },
  @{ Src = "novikov";                  Dst = "03-Shia-Sia-Novikov-DD-package" },
  @{ Src = "Demetris_6-90MW";          Dst = "04-Demetris-6-90MW-study" }
)
foreach ($m in $map) {
  $s = Join-Path $src $m.Src
  $d = Join-Path $org $m.Dst
  if (-not (Test-Path $s)) { Write-Warning "Skip missing source: $s"; continue }
  New-Item -ItemType Directory -Force -Path $d | Out-Null
  Write-Host "Copy $($m.Src) -> $($m.Dst)"
  robocopy $s $d /E /COPY:DAT /DCOPY:DAT /R:3 /W:5 /MT:8 /NP | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $($m.Src) exit $LASTEXITCODE" }
}

$rootMisc = Join-Path $org "00-Root-misc"
New-Item -ItemType Directory -Force -Path $rootMisc | Out-Null
Get-ChildItem $src -File -Force | ForEach-Object {
  Copy-Item $_.FullName -Destination (Join-Path $rootMisc $_.Name) -Force
}

$readme = @"
# SOLARFARMS — parks for sale archive

Synced from repo: ``solinvest/parks-for-sale`` (run ``scripts/sync-parks-for-sale-to-google-solarfarms.ps1`` to refresh).

## Folder layout

| Path | Contents |
|------|----------|
| **parks-for-sale/** | 1:1 mirror of the Git repo folder (same subfolder names as developer checkout). |
| **parks-by-deal/** | Same files, sorted for browsing by deal / counterparty. |

### parks-by-deal

| Folder | Source in repo | Notes |
|--------|----------------|--------|
| ``00-Root-misc`` | Files sitting directly under ``parks-for-sale/`` (not in a subfolder) | e.g. cross-cutting PDFs |
| ``01-Vanalio-Jonathan-10.4-DD`` | ``Jonathan 10.4/`` | Vanalio plot DD, repayment schedules, permits |
| ``02-Ragelia-George-Balatsos-portfolio`` | ``Ragelia_George-Balatsos/`` | Multi-park Ragelia portfolio + per-park READMEs |
| ``03-Shia-Sia-Novikov-DD-package`` | ``novikov/`` | SHIA / SIA DD package (EAC, land, permissions, FM) |
| ``04-Demetris-6-90MW-study`` | ``Demetris_6-90MW/`` | Internal HTML/MD study |

**Note:** ``parks-for-sale`` and ``parks-by-deal`` duplicate the same material (mirror + organized view). Disk use ~2× the repo ``parks-for-sale`` size.

Last sync: **$(Get-Date -Format "yyyy-MM-dd HH:mm")** (local)
"@
Set-Content -Path (Join-Path $GoogleDriveSolarfarmsRoot "README-PARKS-ARCHIVE.md") -Value $readme -Encoding UTF8

Write-Host "Done. README: $(Join-Path $GoogleDriveSolarfarmsRoot 'README-PARKS-ARCHIVE.md')"
