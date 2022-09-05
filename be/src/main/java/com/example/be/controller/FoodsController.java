package com.example.be.controller;

import com.example.be.model.Drink;
import com.example.be.model.Foods;
import com.example.be.service.IDrinkService;
import com.example.be.service.IFoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class FoodsController {
    @Autowired
    private IFoodsService foodsService;

    @GetMapping("/food-list")
    public ResponseEntity<List<Foods>> findAll() {
        List<Foods> foods = foodsService.getAllFoods();
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
    @DeleteMapping("/food-remove/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Foods> foods = foodsService.findById(id);
        if (!foods.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        foodsService.remove(foods.get());
        return new ResponseEntity<>(foods.get(), HttpStatus.OK);
    }

    @PostMapping("/create-food")
    public ResponseEntity<?> createTicket(@RequestBody Foods foods) {
        foodsService.save(foods);
        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }
}
