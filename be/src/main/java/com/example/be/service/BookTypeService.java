package com.example.be.service;

import com.example.be.model.BookType;
import com.example.be.repository.IBookTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookTypeService implements IBookTypeService {
    @Autowired
    private IBookTypeRepository bookTypeRepository;
    @Override
    public List<BookType> findAll() {
        return bookTypeRepository.findAllBook();
    }
}
