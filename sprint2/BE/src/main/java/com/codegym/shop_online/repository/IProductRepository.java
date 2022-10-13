package com.codegym.shop_online.repository;

import com.codegym.shop_online.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT * FROM product where delete_status = 0 ORDER BY release_time DESC limit 8 ", nativeQuery = true)
    List<Product> getNewProducts();

    @Query(value = "SELECT * FROM product where name like %:name% ORDER BY release_time DESC", nativeQuery = true)
    Page<Product> findAllByName(Pageable pageable, @Param("name") String name);

    @Query(value = "SELECT * FROM product where delete_status = 0", nativeQuery = true)
    Page<Product> findAllShop(Pageable pageable);

    @Query(value = "SELECT * FROM product where category_id = :id ORDER BY release_time DESC", nativeQuery = true)
    Page<Product> findAllByCategory(Pageable pageable, @Param("id") Integer id);

    @Query(value = "SELECT * FROM product where price between :price and :prices ORDER BY release_time DESC", nativeQuery = true)
    Page<Product> findAllProductByPrice(Pageable pageable, @Param("price") Integer price);


    @Query(value = "SELECT * FROM shop.product limit 4;", nativeQuery = true)
    List<Product> getProducts();

    @Transactional
    @Modifying
    @Query(value = " update product set delete_status = 1 where id =:id ", nativeQuery = true)
    void deleteProduct(@Param("id") Integer id);

    @Transactional
    @Modifying
    @Query(value = "    update product set image=:image,manufacture_time=:manufacture_time,manufacturer=:manufacturer," +
            "name=:name,price=:price,quantity=:quantity,release_time=:release_time,warranty=:warranty," +
            "category_id=:category_id where id=:id", nativeQuery = true)
    void editProduct(@Param("image") String image, @Param("manufacture_time") Date manufacture_time,@Param("manufacturer") String manufacturer,
                     @Param("name") String name,@Param("category_id") Integer category_id,@Param("price") Double price, @Param("quantity") Integer quantity, @Param("release_time") Date release_time,
                     @Param("warranty") String warranty, @Param("id") Integer id);
}
