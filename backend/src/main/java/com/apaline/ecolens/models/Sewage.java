package com.apaline.ecolens.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity // Tells Hibernate to make a table out of this class.
public class Sewage {
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
     * The company responsible for the sewage discharge.
     */
    private String facilityOwner;

    /**
     * Address of the sewage facility.
     */
    private String siteAddress;

    /**
     * Municipality where the facility is located.
     */
    private String siteMunicipality;

    /**
     * Industrial sector of the facility.
     */
    private String sector;

    /**
     * Geographical district of the facility.
     */
    private String district;

    /**
     * Pollutant being monitored in the sewage.
     */
    private String contaminant;

    /**
     * Maximum allowable limit for the contaminant.
     */
    private float contaminantLimit;

    /**
     * Unit of measurement for the contaminant.
     */
    private String contaminantUnit;

    /**
     * Minimum recorded value of the contaminant.
     */
    private float contaminantMinRecord;

    /**
     * Maximum recorded value of the contaminant.
     */
    private float contaminantMaxRecord;

    /**
     * Type of regulatory exceedance for the discharge.
     */
    private String exceedanceType;

    /**
     * Start date of the exceedance.
     */
    private LocalDate exceedanceStart;

    /**
     * End date of the exceedance.
     */
    private LocalDate exceedanceEnd;

    /**
     * Number of times the contaminant exceeded the limit.
     */
    private int exceedanceCount;

    /**
     * Frequency of limit application.
     */
    private String limitFrequency;

    /**
     * Steps taken by the facility to mitigate exceedances.
     */
    private String facilityAction;

    /**
     * Regulatory actions taken by authorities.
     */
    private String ministryAction;

    
    public Sewage() {
    }

    public Sewage(
            Integer id,
            String lastUpdated,
            String facilityOwner,
            String siteAddress,
            String siteMunicipality,
            String sector,
            String district,
            String contaminant,
            float contaminantLimit,
            String contaminantUnit,
            float contaminantMinRecord,
            float contaminantMaxRecord,
            String exceedanceType,
            String exceedanceStart,
            String exceedanceEnd,
            int exceedanceCount,
            String limitFrequency,
            String facilityAction,
            String ministryAction) {
        this.id = id;
        this.lastUpdated = LocalDateTime.parse(lastUpdated, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.facilityOwner = facilityOwner;
        this.siteAddress = siteAddress;
        this.siteMunicipality = siteMunicipality;
        this.sector = sector;
        this.district = district;
        this.contaminant = contaminant;
        this.contaminantLimit = contaminantLimit;
        this.contaminantUnit = contaminantUnit;
        this.contaminantMinRecord = contaminantMinRecord;
        this.contaminantMaxRecord = contaminantMaxRecord;
        this.exceedanceType = exceedanceType;
        this.exceedanceStart = LocalDate.parse(exceedanceStart, DateTimeFormatter.ISO_LOCAL_DATE);
        this.exceedanceEnd = LocalDate.parse(exceedanceEnd, DateTimeFormatter.ISO_LOCAL_DATE);
        this.exceedanceCount = exceedanceCount;
        this.limitFrequency = limitFrequency;
        this.facilityAction = facilityAction;
        this.ministryAction = ministryAction;
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

    public String getFacilityOwner() {
        return facilityOwner;
    }

    public void setFacilityOwner(String facilityOwner) {
        this.facilityOwner = facilityOwner;
    }

    public String getSiteAddress() {
        return siteAddress;
    }

    public void setSiteAddress(String siteAddress) {
        this.siteAddress = siteAddress;
    }

    public String getSiteMunicipality() {
        return siteMunicipality;
    }

    public void setSiteMunicipality(String siteMunicipality) {
        this.siteMunicipality = siteMunicipality;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getContaminant() {
        return contaminant;
    }

    public void setContaminant(String contaminant) {
        this.contaminant = contaminant;
    }

    public float getContaminantLimit() {
        return contaminantLimit;
    }

    public void setContaminantLimit(float contaminantLimit) {
        this.contaminantLimit = contaminantLimit;
    }

    public String getContaminantUnit() {
        return contaminantUnit;
    }

    public void setContaminantUnit(String contaminantUnit) {
        this.contaminantUnit = contaminantUnit;
    }

    public float getContaminantMinRecord() {
        return contaminantMinRecord;
    }

    public void setContaminantMinRecord(float contaminantMinRecord) {
        this.contaminantMinRecord = contaminantMinRecord;
    }

    public float getContaminantMaxRecord() {
        return contaminantMaxRecord;
    }

    public void setContaminantMaxRecord(float contaminantMaxRecord) {
        this.contaminantMaxRecord = contaminantMaxRecord;
    }

    public String getExceedanceType() {
        return exceedanceType;
    }

    public void setExceedanceType(String exceedanceType) {
        this.exceedanceType = exceedanceType;
    }

    public LocalDate getExceedanceStart() {
        return exceedanceStart;
    }

    public void setExceedanceStart(LocalDate exceedanceStart) {
        this.exceedanceStart = exceedanceStart;
    }

    public LocalDate getExceedanceEnd() {
        return exceedanceEnd;
    }

    public void setExceedanceEnd(LocalDate exceedanceEnd) {
        this.exceedanceEnd = exceedanceEnd;
    }

    public int getExceedanceCount() {
        return exceedanceCount;
    }

    public void setExceedanceCount(int exceedanceCount) {
        this.exceedanceCount = exceedanceCount;
    }

    public String getLimitFrequency() {
        return limitFrequency;
    }

    public void setLimitFrequency(String limitFrequency) {
        this.limitFrequency = limitFrequency;
    }

    public String getFacilityAction() {
        return facilityAction;
    }

    public void setFacilityAction(String facilityAction) {
        this.facilityAction = facilityAction;
    }

    public String getMinistryAction() {
        return ministryAction;
    }

    public void setMinistryAction(String ministryAction) {
        this.ministryAction = ministryAction;
    }
}
