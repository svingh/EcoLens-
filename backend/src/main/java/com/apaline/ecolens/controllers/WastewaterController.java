package com.apaline.ecolens.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.apaline.ecolens.models.Wastewater;
import com.apaline.ecolens.services.WastewaterService;

@RestController
@RequestMapping(path = "/api/wastewater")
public class WastewaterController {
    /**
     * Interface for accessing high-level wastewater model operations.
     */
    private WastewaterService service;
    
    @Autowired
    WastewaterController(WastewaterService service) {
        this.service = service;
    }

    @GetMapping
    public @ResponseBody Iterable<Wastewater> all() {
        return service.all();
    }

    @PutMapping
    public @ResponseBody String update(@RequestBody Iterable<Wastewater> items) {
        return service.update(items);
    }
}
