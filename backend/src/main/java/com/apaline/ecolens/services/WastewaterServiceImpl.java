package com.apaline.ecolens.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apaline.ecolens.dao.WastewaterDao;
import com.apaline.ecolens.models.Wastewater;

@Service
public class WastewaterServiceImpl implements WastewaterService {
    /**
     * Data access object for operating on wastewater models.
     */
    @Autowired
    private WastewaterDao dao;

    @Override
    public Iterable<Wastewater> all() {
        return dao.findAll();
    }

    @Override
    public String update(Iterable<Wastewater> wastewater) {
        try {
            dao.saveAll(wastewater);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "Updated";
    }
}
