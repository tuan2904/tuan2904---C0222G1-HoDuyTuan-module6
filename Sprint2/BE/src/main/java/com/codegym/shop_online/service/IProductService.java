package com.codegym.shop_online.service;

import com.codegym.shop_online.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {

    List<Product> getNewProducts();

    void save(Product product);

    Page<Product> findAll(Pageable pageable);
    Page<Product> search(Pageable pageable,String name);

    Product findById(Integer id);
}
