package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.model.Product;
import com.codegym.shop_online.repository.IProductRepository;
import com.codegym.shop_online.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
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
    public List<Product> getProducts() {
        return iProductRepository.getProducts();
    }

    @Override
    public void save(Product product) {
        product.setDeleteStatus(false);
        iProductRepository.save(product);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return iProductRepository.findAllShop(pageable);
    }

    @Override
    public Page<Product> findAllByName(Pageable pageable, String name) {
        return iProductRepository.findAllByName(pageable, name);
    }

    @Override
    public Page<Product> findAllByCategory(Pageable pageable, Integer id) {
        return iProductRepository.findAllByCategory(pageable, id);
    }

    @Override
    public Product findById(Integer id) {
        return iProductRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Product> findAllByPrice(Pageable pageable, Integer price) {
        return iProductRepository.findAllProductByPrice(pageable,price);
    }

    @Override
    public void delete(Integer id) {
        iProductRepository.deleteById(id);
    }

    @Override
    public Boolean deleteProduct(Integer id) {
        List<Product> productList = this.iProductRepository.findAll();
        for (Product product : productList) {
            if (product.getId().equals(id) && !product.getDeleteStatus()) {
                this.iProductRepository.deleteProduct(id);
                return true;
            }
        }
        return false;
    }
//    @Param("image") String image, @Param("manufacture_time")
//    java.sql.Date manufacture_time,@Param("manufacturer") String manufacturer,
//    @Param("name") String name,@Param("category_id") Integer category_id,@Param("price") Double price, @Param("quantity") Integer quantity, @Param("release_time")
//    Date release_time,
//    @Param("warranty") String warranty, @Param("id") Integer id
    @Override
    public void updateComputer(Integer id, Product product) {
        iProductRepository.editProduct(product.getImage(),product.getManufactureTime(),product.getManufacturer(),
                product.getName(),product.getCategory().getId(),product.getPrice(),
                product.getQuantity(),product.getManufactureTime(),product.getWarranty(),product.getId());
    }
}
