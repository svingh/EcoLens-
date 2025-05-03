package com.apaline.ecolens.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity // Tells Hibernate to make a table out of this class.
public class Wastewater {
    /**
     * Unique value that identifies the sewage discharge record.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Datetime of when the row was uploaded to the CIS Data Service.
     */
    private LocalDateTime lastUpdated;

    /**
     * Industrial sector of the facility.
     */
    private String sector;

    /**
     * Municipality where the facility is located.
     */
    private String facility;

    /**
     * Municipality where the facility is located.
     */
    private String facilityMunicipality;

    /**
     * Unique code for the company.
     */
    private String companyCode;

    /**
     * Date when the wastewater sample was taken.
     */
    private String sampleDate;

    /**
     * Frequency of sample collection.
     */
    private String sampleCollectionFrequency;

    /**
     * Name of the sampling location within the facility.
     */
    private String controlPointName;

    /**
     * Unique ID for the control point.
     */
    private String controlPointId;

    /**
     * Pollutant or substance being measured.
     */
    private String parameter;

    /**
     * Measured value of the parameter.
     */
    private float parameterValue;

    /**
     * Unit of measurement for the value.
     */
    private String parameterUnit;

    /**
     * How the parameter is expressed.
     */
    private String reportedParameter;

    /**
     * Structure or format of the result.
     */
    private String resultStructure;

    /**
     * Type of component in the wastewater (e.g., dissolved solids).
     */
    private String componentType;

    /**
     * Applicable regulatory standard or limit.
     */
    private String regulation;

    public Wastewater() {
    }

    public Wastewater(
        Integer id, String lastUpdated, String sector, String facility,
        String facilityMunicipality, String companyCode, String sampleDate, 
        String sampleCollectionFrequency, String controlPointName, String controlPointId, 
        String parameter, float parameterValue, String parameterUnit, String reportedParameter, 
        String resultStructure, String componentType, String regulation) {
        this.id = id;
        this.lastUpdated = LocalDateTime.parse(lastUpdated, DateTimeFormatter.ISO_DATE_TIME);
        this.sector = sector;
        this.facility = facility;
        this.facilityMunicipality = facilityMunicipality;
        this.companyCode = companyCode;
        this.sampleDate = sampleDate;
        this.sampleCollectionFrequency = sampleCollectionFrequency;
        this.controlPointName = controlPointName;
        this.controlPointId = controlPointId;
        this.parameter = parameter;
        this.parameterValue = parameterValue;
        this.parameterUnit = parameterUnit;
        this.reportedParameter = reportedParameter;
        this.resultStructure = resultStructure;
        this.componentType = componentType;
        this.regulation = regulation;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public String getFacilityMunicipality() {
        return facilityMunicipality;
    }

    public void setFacilityMunicipality(String facilityMunicipality) {
        this.facilityMunicipality = facilityMunicipality;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getSampleDate() {
        return sampleDate;
    }

    public void setSampleDate(String sampleDate) {
        this.sampleDate = sampleDate;
    }

    public String getSampleCollectionFrequency() {
        return sampleCollectionFrequency;
    }

    public void setSampleCollectionFrequency(String sampleCollectionFrequency) {
        this.sampleCollectionFrequency = sampleCollectionFrequency;
    }

    public String getControlPointName() {
        return controlPointName;
    }

    public void setControlPointName(String controlPointName) {
        this.controlPointName = controlPointName;
    }

    public String getControlPointId() {
        return controlPointId;
    }

    public void setControlPointId(String controlPointId) {
        this.controlPointId = controlPointId;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public float getParameterValue() {
        return parameterValue;
    }

    public void setParameterValue(float parameterValue) {
        this.parameterValue = parameterValue;
    }

    public String getParameterUnit() {
        return parameterUnit;
    }

    public void setParameterUnit(String parameterUnit) {
        this.parameterUnit = parameterUnit;
    }

    public String getReportedParameter() {
        return reportedParameter;
    }

    public void setReportedParameter(String reportedParameter) {
        this.reportedParameter = reportedParameter;
    }

    public String getResultStructure() {
        return resultStructure;
    }

    public void setResultStructure(String resultStructure) {
        this.resultStructure = resultStructure;
    }

    public String getComponentType() {
        return componentType;
    }

    public void setComponentType(String componentType) {
        this.componentType = componentType;
    }

    public String getRegulation() {
        return regulation;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }
}
