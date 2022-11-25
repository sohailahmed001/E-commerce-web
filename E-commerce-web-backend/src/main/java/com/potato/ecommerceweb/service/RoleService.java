package com.potato.ecommerceweb.service;

import com.potato.ecommerceweb.dao.RoleDao;
import com.potato.ecommerceweb.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
