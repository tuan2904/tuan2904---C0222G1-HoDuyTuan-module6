package com.example.shop.service.impl;

import com.example.shop.model.account.UserRole;
import com.example.shop.repository.IUserRoleRepository;
import com.example.shop.service.IUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleService implements IUserRoleService {

    @Autowired
    private IUserRoleRepository iUserRoleRepository;

    @Override
    public void save(UserRole userRole) {
        iUserRoleRepository.save(userRole);
    }
}
