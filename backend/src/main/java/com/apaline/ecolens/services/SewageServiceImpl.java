package com.apaline.ecolens.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.apaline.ecolens.dao.SewageDao;
import com.apaline.ecolens.models.Sewage;

@Service
public class SewageServiceImpl implements SewageService {
    /**
     * Data access object for operating on sewage models.
     */
    @Autowired
    private SewageDao dao;

    @Override
    public Iterable<Sewage> all() {
        return dao.findAll();
    }

    @Override
    public String update(Iterable<Sewage> sewage) {
        try {
            dao.saveAll(sewage);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "Updated";
    }
}
