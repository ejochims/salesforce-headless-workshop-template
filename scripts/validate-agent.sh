#!/usr/bin/env bash
set -euo pipefail

ORG_ALIAS="${1:-workshop-org}"

echo "Use coding agent or Salesforce agent preview with this proof utterance:"
echo "A delivery from Denver to Phoenix arrived short. Find the partner, check related delivery context, and prepare a high-priority shortage case."
echo
echo "Target org:"
sf org display --target-org "$ORG_ALIAS" --json
echo
echo "If an authoring bundle exists, validate it with:"
echo "sf agent validate authoring-bundle --json --api-name Operations_Support_Assistant"

echo
echo "Fallback proof:"
echo "If Agentforce is unavailable, preserve the Operations Support Assistant Agent Spec and the exact CLI/org capability blocker."
