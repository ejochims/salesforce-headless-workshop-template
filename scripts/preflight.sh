#!/usr/bin/env bash
set -euo pipefail

echo "Node"
node --version
npm --version

echo
echo "Salesforce CLI"
sf --version

echo
echo "Authorized orgs"
sf org list --all

echo
echo "Current target org"
sf config get target-org --json
