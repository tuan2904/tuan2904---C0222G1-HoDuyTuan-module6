package com.example.be.service;

import com.example.be.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IBookService {
    List<Book> getAllBook ();
    void remove(Book book);
    Optional<Book> findById(Integer id);
    void save(Book book);
    Boolean existsCode(String code);

}
