package com.example.be.service;

import com.example.be.model.Drink;
import com.example.be.model.Foods;
import com.example.be.repository.IFoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodsService implements IFoodsService{
    @Autowired
    private IFoodsRepository foodsRepository;
    @Override
    public List<Foods> getAllFoods() {
        return foodsRepository.findAllFood();
    }

    @Override
    public void remove(Foods foods) {
        foodsRepository.delete(foods);
    }

    @Override
    public Optional<Foods> findById(Integer id) {
        return foodsRepository.findById(id);
    }

    @Override
    public void save(Foods foods) {
        foodsRepository.save(foods);
    }
}
