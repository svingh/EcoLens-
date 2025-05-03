package com.apaline.ecolens.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.apaline.ecolens.models.Sewage;
import com.apaline.ecolens.services.SewageService;

@RestController
@RequestMapping(path = "/api/sewage")
public class SewageController {
    /**
     * Interface for accessing high-level sewage model operations.
     */
    private SewageService service;
    
    @Autowired
    SewageController(SewageService service) {
        this.service = service;
    }

    @GetMapping
    public @ResponseBody Iterable<Sewage> all() {
        return service.all();
    }

    @PutMapping
    public @ResponseBody String update(@RequestBody Iterable<Sewage> items) {
        return service.update(items);
    }
}
