package com.apaline.ecolens;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.apaline.ecolens.models.Sewage;

@Tag("unit")
class SewageTests {
    @Test
    void testConstructor() {
        var sewage = new Sewage();

        assertNull(sewage.getContaminant());
        assertNull(sewage.getContaminantUnit());
        assertEquals(sewage.getContaminantLimit(), 0);
        assertEquals(sewage.getContaminantMaxRecord(), 0);
        assertEquals(sewage.getContaminantMinRecord(), 0);
        assertNull(sewage.getDistrict());
        assertNull(sewage.getExceedanceEnd());
        assertNull(sewage.getExceedanceStart());
        assertNull(sewage.getExceedanceType());
        assertNull(sewage.getFacilityOwner());
        assertNull(sewage.getId()); // Integer can be null, but not int.
        assertNull(sewage.getLastUpdated());
        assertNull(sewage.getFacilityAction());
        assertNull(sewage.getMinistryAction());
        assertEquals(sewage.getExceedanceCount(), 0);
        assertNull(sewage.getLimitFrequency());
        assertNull(sewage.getSector());
        assertNull(sewage.getSiteMunicipality());
        assertNull(sewage.getSiteAddress());
    }

    @Test
    void testConstructorWithParameters() {
        var sewage = new Sewage(
            5,
            "2000-01-01T12:12:12", 
            "foo-owner", 
            "foo-address", 
            "foo-municipality", 
            "foo-sector", 
            "foo-district", 
            "foo-contaminant", 
            1.5f, 
            "foo-unit", 
            0.5f, 
            2.5f, 
            "foo-exceedanceType", 
            "1999-01-01", 
            "1999-02-01", 
            3, 
            "foo-limitFrequency", 
            "foo-facilityAction", 
            "foo-ministryAction");

        assertEquals(sewage.getContaminant(), "foo-contaminant");
        assertEquals(sewage.getContaminantLimit(), 1.5f);
        assertEquals(sewage.getContaminantMinRecord(), 0.5f);
        assertEquals(sewage.getContaminantMaxRecord(), 2.5f);
        assertEquals(sewage.getContaminantUnit(), "foo-unit");
        assertEquals(sewage.getDistrict(), "foo-district");
        assertEquals(sewage.getExceedanceCount(), 3);
        assertEquals(sewage.getExceedanceType(), "foo-exceedanceType");
        assertEquals(sewage.getFacilityAction(), "foo-facilityAction");
        assertEquals(sewage.getMinistryAction(), "foo-ministryAction");
        assertEquals(sewage.getFacilityOwner(), "foo-owner");
        assertEquals(sewage.getId(), 5);
        assertEquals(sewage.getLimitFrequency(), "foo-limitFrequency");
        assertEquals(sewage.getSector(), "foo-sector");
        assertEquals(sewage.getSiteAddress(), "foo-address");
        assertEquals(sewage.getSiteMunicipality(), "foo-municipality");
        
        var lastUpdated = sewage.getLastUpdated();

        assertEquals(lastUpdated.getDayOfMonth(), 1);
        assertEquals(lastUpdated.getMonth().getValue(), 1);
        assertEquals(lastUpdated.getYear(), 2000);
        assertEquals(lastUpdated.getHour(), 12);
        assertEquals(lastUpdated.getMinute(), 12);
        assertEquals(lastUpdated.getSecond(), 12);

        var exceedanceEnd = sewage.getExceedanceEnd();
        assertEquals(exceedanceEnd.getDayOfMonth(), 1);
        assertEquals(exceedanceEnd.getMonth().getValue(), 2);
        assertEquals(exceedanceEnd.getYear(), 1999);

        var exceedanceStart = sewage.getExceedanceStart();
        assertEquals(exceedanceStart.getDayOfMonth(), 1);
        assertEquals(exceedanceStart.getMonth().getValue(), 1);
        assertEquals(exceedanceStart.getYear(), 1999);
    }

    @Test
    void testSetId() {
        var sewage = new Sewage();
        var id = 5;

        sewage.setId(id);
        assertEquals(id, sewage.getId());
    }

    @Test
    void testSetLastUpdated() {
        var sewage = new Sewage();
        var lastUpdated = LocalDateTime.MIN;

        sewage.setLastUpdated(lastUpdated);
        assertEquals(lastUpdated, sewage.getLastUpdated());
    }

    @Test
    void testSetFacilityOwner() {
        var sewage = new Sewage();
        var facilityOwner = "foo";

        sewage.setFacilityOwner(facilityOwner);
        assertEquals(facilityOwner, sewage.getFacilityOwner());
    }

    @Test
    void setSiteAddress() {
        var sewage = new Sewage();
        var siteAddress = "foo";

        sewage.setSiteAddress(siteAddress);
        assertEquals(siteAddress, sewage.getSiteAddress());
    }

    @Test
    void testSetSiteMunicipality() {
        var sewage = new Sewage();
        var siteMunicipality = "foo";

        sewage.setSiteMunicipality(siteMunicipality);
        assertEquals(siteMunicipality, sewage.getSiteMunicipality());
    }

    @Test
    void testSetSector() {
        var sewage = new Sewage();
        var sector = "foo";

        sewage.setSector(sector);
        assertEquals(sector, sewage.getSector());
    }

    @Test
    void testSetDistrict() {
        var sewage = new Sewage();
        var district = "foo";

        sewage.setDistrict(district);
        assertEquals(district, sewage.getDistrict());
    }

    @Test
    void testSetContaminant() {
        var sewage = new Sewage();
        var contaminant = "foo";

        sewage.setContaminant(contaminant);
        assertEquals(contaminant, sewage.getContaminant());
    }

    @Test
    void testSetContaminantLimit() {
        var sewage = new Sewage();
        var limit = 1.0f;

        sewage.setContaminantLimit(limit);
        assertEquals(limit, sewage.getContaminantLimit());
    }

    @Test
    void testSetContaminantUnit() {
        var sewage = new Sewage();
        var unit = "foo";

        sewage.setContaminantUnit(unit);
        assertEquals(unit, sewage.getContaminantUnit());
    }

    @Test
    void testSetContaminantMinRecord() {
        var sewage = new Sewage();
        var minRecord = 1.0f;

        sewage.setContaminantMinRecord(minRecord);
        assertEquals(minRecord, sewage.getContaminantMinRecord());
    }

    @Test
    void testSetContaminantMaxRecord() {
        var sewage = new Sewage();
        var maxRecord = 1.0f;

        sewage.setContaminantMaxRecord(maxRecord);
        assertEquals(maxRecord, sewage.getContaminantMaxRecord());
    }

    @Test
    void testSetExceedanceType() {
        var sewage = new Sewage();
        var exceedanceType = "foo";

        sewage.setExceedanceType(exceedanceType);
        assertEquals(exceedanceType, sewage.getExceedanceType());
    }

    @Test
    void testSetExceedanceStart() {
        var sewage = new Sewage();
        var exceedanceStart = LocalDate.MIN;

        sewage.setExceedanceStart(exceedanceStart);
        assertEquals(exceedanceStart, sewage.getExceedanceStart());
    }

    @Test
    void testSetExceedanceEnd() {
        var sewage = new Sewage();
        var exceedanceEnd = LocalDate.MIN;

        sewage.setExceedanceEnd(exceedanceEnd);
        assertEquals(exceedanceEnd, sewage.getExceedanceEnd());
    }

    @Test
    void testSetExceedanceCount() {
        var sewage = new Sewage();
        var exceedanceCount = 1;

        sewage.setExceedanceCount(exceedanceCount);
        assertEquals(exceedanceCount, sewage.getExceedanceCount());
    }
    
    @Test
    void testSetLimitFrequency() {
        var sewage = new Sewage();
        var limitFrequency = "foo";

        sewage.setLimitFrequency(limitFrequency);
        assertEquals(limitFrequency, sewage.getLimitFrequency());
    }

    @Test
    void testSetFacilityAction() {
        var sewage = new Sewage();
        var facilityAction = "foo";

        sewage.setFacilityAction(facilityAction);
        assertEquals(facilityAction, sewage.getFacilityAction());
    }

    @Test
    void testSetMinistryAction() {
        var sewage = new Sewage();
        var ministryAction = "foo";

        sewage.setMinistryAction(ministryAction);
        assertEquals(ministryAction, sewage.getMinistryAction());
    }
}
