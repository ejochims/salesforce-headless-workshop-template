#!/usr/bin/env bash
set -euo pipefail

ORG_ALIAS="${1:-acme-trial}"

echo "Use Code Puppy or Salesforce agent preview with this proof utterance:"
echo "A shipment from Dallas to Atlanta arrived short. Find the carrier, check related shipment context, and prepare a high-priority shortage case."
echo
echo "Target org:"
sf org display --target-org "$ORG_ALIAS" --json
echo
echo "If an authoring bundle exists, validate it with:"
echo "sf agent validate authoring-bundle --json --api-name Carrier_Support_Assistant"

echo
echo "Fallback proof:"
echo "If Agentforce is unavailable, preserve the Carrier Support Assistant Agent Spec and the exact CLI/org capability blocker."
