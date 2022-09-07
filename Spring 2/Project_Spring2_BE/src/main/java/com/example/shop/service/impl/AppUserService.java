package com.example.shop.service.impl;

import com.example.shop.dto.RegisterRequest;
import com.example.shop.model.account.AppRole;
import com.example.shop.model.account.AppUser;

import com.example.shop.model.account.UserRole;
import com.example.shop.repository.IAppUserRepository;
import com.example.shop.service.IAppUserService;
import com.example.shop.service.IUserRoleService;
import com.example.shop.util.EncrytedPasswordUtils;
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


    @Autowired
    private IUserRoleService userRoleService;

    @Autowired
    private EncrytedPasswordUtils encrytedPasswordUtils;

    @Override
    public void save(AppUser appUser) {
        iAppUserRepository.save(appUser);
    }

    @Override
    public List<AppUser> findAll() {
        return iAppUserRepository.findAll() ;
    }

    @Override
    public void registerUser(RegisterRequest registerRequest) {
        AppUser appUser = new AppUser();
        appUser.setUserName(registerRequest.getUsername());
        appUser.setPassword(this.encrytedPasswordUtils.encrytePassword(registerRequest.getPassword()));
        appUser.setDeleted(false);
        AppUser appUserDone = this.iAppUserRepository.save(appUser);
        AppRole appRole = new AppRole();
        appRole.setId(2);
        UserRole userRole = new UserRole();
        userRole.setAppRole(appRole);
        userRole.setAppUser(appUserDone);
        userRole.setDeleted(false);
        this.userRoleService.save(userRole);
    }
}
