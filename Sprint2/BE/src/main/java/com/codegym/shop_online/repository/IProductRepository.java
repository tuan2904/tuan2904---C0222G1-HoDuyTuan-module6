package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = " SELECT * FROM product where delete_status = 0 ORDER BY release_time desc limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();

    @Query(value = "SELECT * FROM product where `name` like %:name%", nativeQuery = true)
    Page<Product> searchProduct(Pageable pageable, @Param("name") String name);
}
