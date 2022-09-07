package com.example.shop.service;

import com.example.shop.model.user.AppUser;

import java.util.List;

public interface IAppUserService {

    AppUser findAppUserByUsername(String username);

    void save(AppUser appUser);

    List<AppUser> findAll();

}
