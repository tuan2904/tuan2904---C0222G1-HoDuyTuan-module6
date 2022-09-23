package com.codegym.shop_online.dto;

import com.codegym.shop_online.model.Category;


import java.util.Date;

public class ProductDTO {
    private Integer id;

    private String name;

    private Date releaseTime;

    private Date manufactureTime;

    private String manufacturer;

    private Double price;

    private String warranty;

    private Integer quantity;

    private String image;

    private Boolean deleteStatus;

    private Category category;
}
