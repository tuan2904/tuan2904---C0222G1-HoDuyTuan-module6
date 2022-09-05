package com.example.be.service;

import com.example.be.model.Book;
import com.example.be.repository.IBookRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepository bookRepository;

    @Override
    public List<Book> getAllBook() {
        return bookRepository.findAllBook();
    }

    @Override
    public void remove(Book book) {
        bookRepository.delete(book);
    }

    @Override
    public Optional<Book> findById(Integer id) {
        return bookRepository.findById(id);
    }

    @Override
    public void save(Book book) {
         bookRepository.save(book);
    }

    @Override
    public Boolean existsCode(String code) {
        return code.equals(bookRepository.exitCode(code));
    }

}
