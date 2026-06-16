#!/usr/bin/env bash
set -euo pipefail

ORG_ALIAS="${1:-acme-trial}"

sf data query \
  --query "SELECT ApiName, Label, IsActive, TriggerType FROM FlowDefinitionView WHERE ApiName='Shipment_Exception_To_Case'" \
  --target-org "$ORG_ALIAS" \
  --json

sf data update record \
  --sobject Shipment__c \
  --where "Status__c='In Transit'" \
  --values "Status__c='Exception'" \
  --target-org "$ORG_ALIAS" \
  --json

sf data query \
  --query "SELECT CaseNumber, Subject, Priority, Issue_Type__c, Transportation_Priority__c, Owner.Name, Owner.Type, Shipment__c, Carrier__c FROM Case ORDER BY CreatedDate DESC LIMIT 3" \
  --target-org "$ORG_ALIAS" \
  --json
