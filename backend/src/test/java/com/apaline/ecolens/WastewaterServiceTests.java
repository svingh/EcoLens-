package com.apaline.ecolens;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import com.apaline.ecolens.dao.WastewaterDao;
import com.apaline.ecolens.models.Wastewater;
import com.apaline.ecolens.services.WastewaterServiceImpl;

@Tag("unit")
class WastewaterServiceTests {
    /**
     * Data access object for operating on sewage models.
     */
    @Mock
    private WastewaterDao dao;

    /**
     * Implementation for accessing high-level sewage model operations.
     */
    @InjectMocks
    private WastewaterServiceImpl service;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAll() {
        List<Wastewater> expected = new ArrayList<>();

        when(dao.findAll()).thenReturn(expected);

        var result = service.all();

        assertNotNull(result);
        assertEquals(expected, result);
        verify(dao, times(1)).findAll();
    }

    @Test
    void testUpdate() {
        var expected = "Updated";
        List<Wastewater> items = new ArrayList<>();

        when(dao.saveAll(items)).thenReturn(items);

        var result = service.update(items);

        assertNotNull(result);
        assertEquals(expected, result);
        verify(dao, times(1)).saveAll(items);
    }
}
