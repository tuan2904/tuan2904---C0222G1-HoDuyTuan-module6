package com.example.be.service;

import com.example.be.model.Drink;
import com.example.be.model.Foods;

import java.util.List;
import java.util.Optional;

public interface IFoodsService {
    List<Foods> getAllFoods ();
    void remove(Foods foods);
    Optional<Foods> findById(Integer id);
    void save(Foods foods);
}
