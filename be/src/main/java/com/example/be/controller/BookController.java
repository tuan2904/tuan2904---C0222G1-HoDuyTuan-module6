package com.example.be.controller;

import com.example.be.model.Book;
import com.example.be.model.BookType;
import com.example.be.service.IBookService;
import com.example.be.service.IBookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class BookController {
    @Autowired
    private IBookService bookService;
    @Autowired
    private IBookTypeService bookTypeService;


    @GetMapping("/list-book")
    public ResponseEntity<List<Book>> findAll() {
        Sort sort = Sort.by("don_gia").ascending();
        List<Book> book = bookService.getAllBook();
        if (book.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping(value = "/list-book-type")
    public ResponseEntity<List<BookType>> getListComputerType() {
        List<BookType> bookTypes = bookTypeService.findAll();
        if (bookTypes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bookTypes, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Book> book = bookService.findById(id);
        if (!book.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        bookService.remove(book.get());
        return new ResponseEntity<>(book.get(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody Book book) {
        bookService.save(book);
        return new ResponseEntity<>(book, HttpStatus.CREATED);
    }

    @GetMapping("/check/{code}")
    public  ResponseEntity<?> checkCode(@PathVariable("code") String code){
        return new ResponseEntity<>(bookService.existsCode(code), HttpStatus.OK);
    }
}
