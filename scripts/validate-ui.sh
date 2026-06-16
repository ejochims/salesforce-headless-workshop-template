#!/usr/bin/env bash
set -euo pipefail

ORG_ALIAS="${1:-acme-trial}"

echo "Checking local UI artifacts"
test -f force-app/main/default/lwc/shipmentTracker/shipmentTracker.js-meta.xml
test -f force-app/main/default/lwc/shipmentTracker/shipmentTracker.html

echo
echo "Previewing deployable changes"
sf project deploy preview --target-org "$ORG_ALIAS" --json

echo
echo "Opening org for visual inspection"
sf org open --target-org "$ORG_ALIAS"
