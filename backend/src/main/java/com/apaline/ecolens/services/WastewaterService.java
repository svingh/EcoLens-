package com.apaline.ecolens.services;

import com.apaline.ecolens.models.Wastewater;

public interface WastewaterService {
    public Iterable<Wastewater> all();
    
    public String update(Iterable<Wastewater> wastewater);
}
