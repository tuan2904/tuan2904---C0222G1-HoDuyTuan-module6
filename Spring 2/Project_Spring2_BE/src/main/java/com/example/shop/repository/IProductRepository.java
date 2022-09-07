package com.example.shop.repository;

import com.example.shop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = " SELECT * FROM product where delete_status = 0 ORDER BY release_time desc limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();

}
