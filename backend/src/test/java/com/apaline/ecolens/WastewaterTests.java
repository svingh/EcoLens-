package com.apaline.ecolens;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.apaline.ecolens.models.Wastewater;

@Tag("unit")
class WastewaterTests {
    @Test
    void testConstructor() {
        var wastewater = new Wastewater();

        assertNull(wastewater.getCompanyCode());
        assertNull(wastewater.getComponentType());
        assertNull(wastewater.getControlPointId());
        assertNull(wastewater.getControlPointName());
        assertNull(wastewater.getFacility());
        assertNull(wastewater.getFacilityMunicipality());
        assertNull(wastewater.getId()); // Integer can be null, but not int.
        assertNull(wastewater.getLastUpdated());
        assertNull(wastewater.getParameter());
        assertNull(wastewater.getParameterUnit());
        assertEquals(wastewater.getParameterValue(), 0);
        assertNull(wastewater.getRegulation());
        assertNull(wastewater.getReportedParameter());
        assertNull(wastewater.getResultStructure());
        assertNull(wastewater.getSampleCollectionFrequency());
        assertNull(wastewater.getSampleDate());
        assertNull(wastewater.getSector());
    }

    @Test
    void testConstructorWithParameters() {
        var wastewater = new Wastewater(
            5,
            "2000-01-01T12:12:12", 
            "foo-sector",
            "foo-facility",
            "foo-municipality",
            "foo-code",
            "2000/01", 
            "foo-frequency", 
            "foo-cpn",
            "foo-cpid",
            "foo-parameter",
            7.7f, 
            "foo-unit",
            "foo-reported",
            "foo-result",
            "foo-ctype",
            "foo-regulation"
        );

        assertEquals(wastewater.getCompanyCode(), "foo-code");
        assertEquals(wastewater.getComponentType(), "foo-ctype");
        assertEquals(wastewater.getControlPointId(), "foo-cpid");
        assertEquals(wastewater.getControlPointName(), "foo-cpn");
        assertEquals(wastewater.getFacility(), "foo-facility");
        assertEquals(wastewater.getFacilityMunicipality(), "foo-municipality");
        assertEquals(wastewater.getId(), 5);
        assertEquals(wastewater.getParameter(), "foo-parameter");
        assertEquals(wastewater.getParameterUnit(), "foo-unit");
        assertEquals(wastewater.getParameterValue(), 7.7f);
        assertEquals(wastewater.getRegulation(), "foo-regulation");
        assertEquals(wastewater.getReportedParameter(), "foo-reported");
        assertEquals(wastewater.getResultStructure(), "foo-result");
        assertEquals(wastewater.getSampleCollectionFrequency(), "foo-frequency");
        assertEquals(wastewater.getSampleDate(), "2000/01");
        assertEquals(wastewater.getSector(), "foo-sector");
        
        var lastUpdated = wastewater.getLastUpdated();

        assertEquals(lastUpdated.getDayOfMonth(), 1);
        assertEquals(lastUpdated.getMonth().getValue(), 1);
        assertEquals(lastUpdated.getYear(), 2000);
        assertEquals(lastUpdated.getHour(), 12);
        assertEquals(lastUpdated.getMinute(), 12);
        assertEquals(lastUpdated.getSecond(), 12);
    }

    @Test
    void testSetId() {
        var id = 1;
        var wastewater = new Wastewater();

        wastewater.setId(id);
        assertEquals(id, wastewater.getId());
    }

    @Test
    void testSetLastUpdated() {
        var wastewater = new Wastewater();
        var lastUpdated = LocalDateTime.MIN;

        wastewater.setLastUpdated(lastUpdated);
        assertEquals(lastUpdated, wastewater.getLastUpdated());
    }

    @Test
    void testSetSector() {
        var wastewater = new Wastewater();
        var sector = "foo";

        wastewater.setSector(sector);
        assertEquals(sector, wastewater.getSector());
    }

    @Test
    void testSetFacility() {
        var wastewater = new Wastewater();
        var facility = "foo";

        wastewater.setFacility(facility);
        assertEquals(facility, wastewater.getFacility());
    }

    @Test
    void testSetFacilityMunicipality() {
        var wastewater = new Wastewater();
        var facilityMunicipality = "foo";

        wastewater.setFacilityMunicipality((facilityMunicipality));
        assertEquals(facilityMunicipality, wastewater.getFacilityMunicipality());
    }

    @Test
    void testSetCompanyCode() {
        var wastewater = new Wastewater();
        var companyCode = "foo";

        wastewater.setCompanyCode(companyCode);
        assertEquals(companyCode, wastewater.getCompanyCode());
    }

    @Test
    void testSetSampleDate() {
        var wastewater = new Wastewater();
        var sampleDate = "foo";

        wastewater.setSampleDate(sampleDate);
        assertEquals(sampleDate, wastewater.getSampleDate());
    }

    @Test
    void testSetSampleCollectionFrequency() {
        var wastewater = new Wastewater();
        var sampleCollectionFrequency = "foo";

        wastewater.setSampleCollectionFrequency(sampleCollectionFrequency);
        assertEquals(sampleCollectionFrequency, wastewater.getSampleCollectionFrequency());
    }

    @Test
    void testSetControlPointName() {
        var wastewater = new Wastewater();
        var controlPointName = "foo";

        wastewater.setControlPointName(controlPointName);
        assertEquals(controlPointName, wastewater.getControlPointName());
    }

    @Test
    void testSetControlPointId() {
        var wastewater = new Wastewater();
        var controlPointId = "foo";

        wastewater.setControlPointId(controlPointId);
        assertEquals(controlPointId, wastewater.getControlPointId());
    }

    @Test
    void testSetParameter() {
        var wastewater = new Wastewater();
        var parameter = "foo";

        wastewater.setParameter(parameter);
        assertEquals(parameter, wastewater.getParameter());
    }

    @Test
    void testSetParameterValue() {
        var wastewater = new Wastewater();
        var parameterValue = 4.0f;

        wastewater.setParameterValue(parameterValue);
        assertEquals(parameterValue, wastewater.getParameterValue());
    }

    @Test
    void testSetReportedParameter() {
        var wastewater = new Wastewater();
        var reportedParameter = "foo";

        wastewater.setReportedParameter(reportedParameter);
        assertEquals(reportedParameter, wastewater.getReportedParameter());
    }

    @Test
    void testSetResultStructure() {
        var wastewater = new Wastewater();
        var resultStructure = "foo";

        wastewater.setResultStructure(resultStructure);
        assertEquals(resultStructure, wastewater.getResultStructure());
    }

    @Test
    void testSetComponentType() {
        var wastewater = new Wastewater();
        var componentType = "foo";

        wastewater.setComponentType(componentType);
        assertEquals(componentType, wastewater.getComponentType());
    }

    @Test
    void testSetRegulation() {
        var wastewater = new Wastewater();
        var regulation = "foo";

        wastewater.setRegulation(regulation);
        assertEquals(regulation, wastewater.getRegulation());
    }
}
