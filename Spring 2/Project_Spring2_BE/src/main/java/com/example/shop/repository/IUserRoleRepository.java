package com.example.shop.repository;

import com.example.shop.model.user.AppUser;
import com.example.shop.model.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IUserRoleRepository extends JpaRepository<UserRole, Integer> {

    List<UserRole> findAllByAppUser(AppUser appUser);

}