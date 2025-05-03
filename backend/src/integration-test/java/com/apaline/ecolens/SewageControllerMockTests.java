package com.apaline.ecolens;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.apaline.ecolens.models.Sewage;
import com.apaline.ecolens.services.SewageService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@Tag("integration")
@AutoConfigureMockMvc
public class SewageControllerMockTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SewageService service;
    
    @Autowired
    private ObjectMapper objectMapper;

    private final String mappingPath = "/api/sewage";

    @Test
    public void testUpdate() throws Exception {
        List<Sewage> list = new ArrayList<>();

        var json = objectMapper.writeValueAsString(list);

        given(service.update(list)).willReturn("Updated");
        mockMvc.perform(put(mappingPath)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                        .andExpect(status().isOk());
    }
    
    @Test
    public void testAll() throws Exception {
        List<Sewage> list = new ArrayList<>();

        given(service.all()).willReturn(list);
        mockMvc.perform(get(mappingPath)
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isOk());
    }
}
