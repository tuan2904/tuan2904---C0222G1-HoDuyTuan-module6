package com.codegym.shop_online.service;

import com.codegym.shop_online.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {

    List<Product> getNewProducts();

    List<Product> getProducts();

    void save(Product product);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findAllByName(Pageable pageable, String name);

    Page<Product> findAllByCategory(Pageable pageable, Integer id);

    Product findById(Integer id);

    Page<Product> findAllByPrice(Pageable pageable, Integer price);

    void delete(Integer id);
    Boolean deleteProduct(Integer id);
    void updateComputer(Integer id,Product product);
}
