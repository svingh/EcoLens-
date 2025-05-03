// src/types.ts
export interface SewageData {
    id: number;
    lastUpdated: string;
    facilityOwner: string;
    siteAddress: string;
    siteMunicipality: string;
    sector: string;
    district: string;
    contaminant: string;
    contaminantLimit: number;
    contaminantUnit: string;
    contaminantMinRecord: number;
    contaminantMaxRecord: number;
    exceedanceType: string;
    exceedanceStart: string;
    exceedanceEnd: string;
    exceedanceCount: number;
    limitFrequency: string;
    facilityAction: string;
    ministryAction: string;
  }
  
  export interface WastewaterData {
    id: number;
    lastUpdated: string;
    sector: string;
    facility: string;
    facilityMunicipality: string;
    companyCode: string;
    sampleDate: string; 
    sampleCollectionFrequency: string | null; 
    controlPointName: string;
    controlPointId: string; 
    parameter: string;  
    parameterValue: number;
    parameterUnit: string;
    reportedParameter: string;
    resultStructure: string;
    componentType: string;
    regulation: string;
  }
  