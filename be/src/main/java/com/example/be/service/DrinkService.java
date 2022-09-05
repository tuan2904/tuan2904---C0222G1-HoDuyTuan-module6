package com.example.be.service;

import com.example.be.model.Drink;
import com.example.be.repository.IDrinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrinkService implements IDrinkService {
    @Autowired
    private IDrinkRepository drinkRepository;

    @Override
    public List<Drink> getAllDrink() {
        return drinkRepository.findAllDrink();
    }

    @Override
    public void remove(Drink drink) {
        drinkRepository.delete(drink);
    }

    @Override
    public Optional<Drink> findById(Integer id) {
        return drinkRepository.findById(id);
    }

    @Override
    public void save(Drink drink) {
        drinkRepository.save(drink);
    }
}
