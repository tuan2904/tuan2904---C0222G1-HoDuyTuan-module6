package com.example.be.repository;

import com.example.be.model.BookType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IBookTypeRepository extends JpaRepository<BookType,Integer> {

    @Query(value="select * from book_type", nativeQuery = true)
    List<BookType> findAllBook();
}
