# Quick launcher — from trading-bot folder:
#   .\run.ps1 dry-run
#   .\run.ps1 testnet

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("dry-run", "testnet")]
    [string]$Mode
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path ".venv")) {
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
} else {
    .\.venv\Scripts\Activate.ps1
}

$env:PYTHONPATH = "src"

if ($Mode -eq "dry-run") {
    python -m stochrsi_bot.engine.runner --dry-run
} else {
    python -m stochrsi_bot.engine.runner --testnet --once
}
