package com.example.shop.service.impl;

import com.example.shop.model.user.AppUser;
import com.example.shop.repository.IAppUserRepository;
import com.example.shop.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements IAppUserService {

    @Autowired
    private IAppUserRepository iAppUserRepository;

    @Override
    public AppUser findAppUserByUsername(String username) {
        return iAppUserRepository.getAppUserByUsername(username);
    }

    @Override
    public void save(AppUser appUser) {
        iAppUserRepository.save(appUser);
    }

    @Override
    public List<AppUser> findAll() {
        return iAppUserRepository.findAll() ;
    }
}
