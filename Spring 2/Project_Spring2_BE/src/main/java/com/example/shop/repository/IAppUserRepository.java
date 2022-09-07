package com.example.shop.repository;

import com.example.shop.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IAppUserRepository extends JpaRepository<AppUser, Integer> {

    @Query(value = "SELECT id, delete_status, username, password WHERE username = :username and delete_status = 0", nativeQuery = true)
    AppUser getAppUserByUsername(@Param("username") String username);
}
