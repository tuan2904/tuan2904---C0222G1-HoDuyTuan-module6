package com.example.shop.service.impl;

import com.example.shop.model.Product;
import com.example.shop.repository.IProductRepository;
import com.example.shop.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public List<Product> getNewProducts() {
        return iProductRepository.getNewProducts();
    }

    @Override
    public void save(Product product) {
        product.setDeleted(false);
        product.setReleaseTime(new Date(System.currentTimeMillis()));
        iProductRepository.save(product);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return iProductRepository.findAll(pageable);
    }

    @Override
    public Product findById(Integer id) {
        return iProductRepository.findById(id).orElse(null);
    }
}