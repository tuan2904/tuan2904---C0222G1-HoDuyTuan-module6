package com.example.be.repository;

import com.example.be.model.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book,Integer> {
    @Query(value="select * from book", nativeQuery=true)
    List<Book> findAllBook();

    @Query(value="select ma_san_pham from book where ma_san_pham=:ma_san_pham",nativeQuery=true)
    String exitCode(@Param("ma_san_pham") String ma);
    }
