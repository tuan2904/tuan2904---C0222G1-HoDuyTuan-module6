package com.example.shop.service;

import com.example.shop.dto.RegisterRequest;
import com.example.shop.model.account.AppUser;

import java.util.List;

public interface IAppUserService {

    AppUser findAppUserByUsername(String username);

    void save(AppUser appUser);

    List<AppUser> findAll();

    void registerUser(RegisterRequest registerRequest);

}
