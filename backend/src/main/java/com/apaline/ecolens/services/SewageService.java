package com.apaline.ecolens.services;

import com.apaline.ecolens.models.Sewage;

public interface SewageService {
    public Iterable<Sewage> all();

    public String update(Iterable<Sewage> sewage);
}
