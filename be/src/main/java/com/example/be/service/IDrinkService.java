package com.example.be.service;

import com.example.be.model.Book;
import com.example.be.model.Drink;

import java.util.List;
import java.util.Optional;

public interface IDrinkService {
    List<Drink> getAllDrink ();
    void remove(Drink drink);
    Optional<Drink> findById(Integer id);
    void save(Drink drink);
}
