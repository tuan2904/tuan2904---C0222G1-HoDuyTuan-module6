package com.example.be.controller;

import com.example.be.model.Book;
import com.example.be.model.Drink;
import com.example.be.service.IDrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class DrinkController {
    @Autowired
    private IDrinkService drinkService;

    @GetMapping("/drink-list")
    public ResponseEntity<List<Drink>> findAll() {
        List<Drink> drink = drinkService.getAllDrink();
        if (drink.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        return new ResponseEntity<>(drink, HttpStatus.OK);
    }
    @DeleteMapping("/remove-drink/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Drink> drink = drinkService.findById(id);
        if (!drink.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        drinkService.remove(drink.get());
        return new ResponseEntity<>(drink.get(), HttpStatus.OK);
    }

    @PostMapping("/create-drink")
    public ResponseEntity<?> createTicket(@RequestBody Drink drink) {
        drinkService.save(drink);
        return new ResponseEntity<>(drink, HttpStatus.CREATED);
    }
}
