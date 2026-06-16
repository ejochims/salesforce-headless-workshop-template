#!/usr/bin/env bash
set -euo pipefail

ORG_ALIAS="${1:-acme-trial}"

sf data query \
  --query "SELECT QualifiedApiName, Label FROM EntityDefinition WHERE QualifiedApiName IN ('Carrier__c','Shipment__c','Case')" \
  --target-org "$ORG_ALIAS" \
  --json

sf data query \
  --query "SELECT Name, Status__c, Safety_Rating__c FROM Carrier__c LIMIT 5" \
  --target-org "$ORG_ALIAS" \
  --json

sf data query \
  --query "SELECT CaseNumber, Subject, Status, Priority, Issue_Type__c FROM Case LIMIT 5" \
  --target-org "$ORG_ALIAS" \
  --json

sf data query \
  --query "SELECT Name FROM PermissionSet WHERE Name = 'Acme_Transport_Workshop_Access'" \
  --target-org "$ORG_ALIAS" \
  --json
