package com.example.be.repository;

import com.example.be.model.Drink;
import com.example.be.model.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFoodsRepository extends JpaRepository<Foods,Integer> {
    @Query(value="select * from foods", nativeQuery=true)
    List<Foods> findAllFood();}
