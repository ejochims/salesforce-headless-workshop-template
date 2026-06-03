export const diagrams = {
  dataModel: `erDiagram
    CARRIER__C {
        string MC_Number__c PK
        string DOT_Number__c
        string Status__c
        string Safety_Rating__c
        decimal On_Time_Percentage__c
    }
    SHIPMENT__C {
        string Id PK
        string Name
        string Origin__c
        string Destination__c
        string Status__c
        date Scheduled_Delivery__c
        date Actual_Delivery__c
        number Weight_lbs__c
        string Partner__c FK
    }
    CASE {
        string Id PK
        string CaseNumber
        string Priority
        string Issue_Type__c
        string Status__c
        string Partner__c FK
        string Delivery__c FK
    }
    CARRIER__C ||--o{ SHIPMENT__C : "Master-Detail"
    CARRIER__C ||--o{ CASE : "Lookup"
    SHIPMENT__C ||--o{ CASE : "Lookup"`,

  headless360: `graph LR
    subgraph Tools["Developer Tools"]
        CP["coding agent"]
        CU["Claude / Cursor"]
    end
    subgraph MCP["MCP Layer"]
        SF["@salesforce/mcp"]
    end
    subgraph SF360["Salesforce Platform"]
        M["Metadata API"]
        D["Data / SOQL"]
        A["Agentforce"]
        U["Users / Perms"]
    end
    CP -->|"stdio MCP"| SF
    CU -->|"stdio MCP"| SF
    SF --> M
    SF --> D
    SF --> A
    SF --> U`,

  customerInfra: `graph TD
    subgraph SF["Salesforce = Customer Infrastructure"]
        E["System of Engagement\n(UI, LWC, Experience Cloud)"]
        AG["System of Agency\n(Agentforce, AI Actions)"]
        W["System of Work\n(Flows, Approvals, Cases)"]
        C["System of Context\n(Data Model, Sharing, Perms)"]
    end
    E --> AG
    AG --> W
    W --> C`,

  agentArchitecture: `graph LR
    subgraph Agent["Operations Support Assistant"]
        T1["Topic: Partner Support"]
        T2["Topic: Case Preparation"]
    end
    subgraph Grounding["CRM Grounding"]
        CA["Partner__c"]
        SH["Delivery__c"]
        TC["Case"]
    end
    T1 --> CA
    T1 --> SH
    T2 --> TC
    T2 --> SH`,
};
