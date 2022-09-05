package com.example.be.repository;

import com.example.be.model.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDrinkRepository extends JpaRepository<Drink,Integer> {
    @Query(value="select * from drink", nativeQuery=true)
    List<Drink> findAllDrink();
}
