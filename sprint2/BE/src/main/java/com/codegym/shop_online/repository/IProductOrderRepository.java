package com.codegym.shop_online.repository;

import com.codegym.shop_online.dto.StatisticsCustomerDTO;
import com.codegym.shop_online.dto.StatisticsDTO;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Date;
import java.util.List;

public interface IProductOrderRepository extends JpaRepository<ProductOrder, Integer> {
    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#productOrder.customer.id} and po.product_id = :#{#productOrder.product.id} and po.bill_id is null ", nativeQuery = true)
    ProductOrder findProductOrderListByCustomerAndProduct(ProductOrder productOrder);

    @Query(value = " select po.* from product_order po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#customer.id} and bill_id is null ", nativeQuery = true)
    List<ProductOrder> getProductInCardByCustomer(Customer customer);

    @Modifying
    @Transactional
    @Query(value = " UPDATE `product_order` SET `bill_id` = :billId WHERE (`customer_id` = :customerId) and `bill_id` is null ", nativeQuery = true)
    void setBill(@Param("customerId") Integer customerId, @Param("billId") Integer billId);

    @Query(value = " select po.id, po.delete_status,po.bill_id, po.customer_id, po.product_id, count(po.quantity) as quantity from bill " +
            " join product_order po on bill.id = po.bill_id " +
            " where po.customer_id = :#{#customer.id} " +
            " group by po.product_id ", nativeQuery = true,
            countQuery = " select po.id, po.delete_status,po.bill_id, po.customer_id, po.product_id, count(po.quantity) as quantity from bill " +
                    "join product_order po on bill.id = po.bill_id " +
                    "where po.customer_id = :#{#customer.id} " +
                    "group by po.product_id ")
    Page<ProductOrder> findProductOrderByCustomer(Pageable pageable, Customer customer);

//    @Query(value = "select po.quantity, p.`name`,b.creation_date from product_order po\n" +
//            "join product p on p.id = po.product_id\n" +
//            "join bill b on b.id = po.bill_id where creation_date between '2022-05-03' and '2022-06-03'",nativeQuery = true)
//        List<ProductOrder>

    @Query(value = " select sum(po.quantity) as quantity, p.name as name, b.creation_date as createDate from product_order po\n" +
            "join bill b on b.id = po.bill_id\n" +
            "join product p on p.id = po.product_id\n" +
            "join customer c on c.id = po.customer_id\n" +
            "group by po.id\n" +
            "having b.creation_date >= current_date - interval 7 day and b.creation_date < current_date - interval - 1 day\n" +
            "order by sum(quantity) desc limit 10;", nativeQuery = true)
    List<StatisticsDTO> findAllStatisticsWeek();

    @Query(value = " select sum(os.quantity) as quantity, p.name as name, b.creation_date as creationDate from product_order os " +
            " left join bill b on b.id = os.bill_id " +
            " left join product p on p.id = os.product_id " +
            " left join customer c on c.id = os.customer_id " +
            " group by os.product_id " +
            " having b.creation_date >= current_date - interval 30 day and b.creation_date < current_date - interval 1 day " +
            " order by sum(quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticsDTO> findAllStatisticsMonth();

    @Query(value = " select sum(os.quantity) as quantity, p.name as name, b.creation_date as creationDate from product_order os " +
            " left join bill b on b.id = os.bill_id " +
            " left join product p on p.id = os.product_id " +
            " left join customer c on c.id = os.customer_id " +
            " group by os.product_id " +
            " having b.creation_date >= current_date - interval 365 day and b.creation_date < current_date - interval 1 day " +
            " order by sum(quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticsDTO> findAllStatisticsYear();


    @Query(value = " select sum(os.quantity) as quantity, c.name as name, c.birthday as birthday , c.phone as phone, c.email as email from product_order os " +
            " left join bill b on b.id = os.bill_id " +
            " left join product p on p.id = os.product_id " +
            " left join customer c on c.id = os.customer_id " +
            " group by os.customer_id  " +
            " order by sum(quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticsCustomerDTO> findAllStatisticsCustomer();

    @Query(value = "select sum(os.quantity) as quantity, p.name as name, b.creation_date as createDate  from product_order os \n" +
            "right join bill b on b.id = os.bill_id \n" +
            "right join product p on p.id = os.product_id\n" +
            "right join customer c on c.id = os.customer_id \n" +
            "group by os.product_id\n" +
            "having (b.creation_date > date(:start)) and (b.creation_date <= date(:end))\n" +
            "order by sum(quantity) desc limit 10;", nativeQuery = true)
    List<StatisticsDTO> findAllDate(@Param("start") Date start, @Param("end") Date end);
}
