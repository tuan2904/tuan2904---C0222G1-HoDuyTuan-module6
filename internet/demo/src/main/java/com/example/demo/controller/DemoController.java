package com.example.demo.controller;

import com.example.demo.model.Demo;
import com.example.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
public class DemoController {
    @Autowired
    private DemoService demoService;

    @GetMapping("/list")
    public ResponseEntity<Page<Demo>> findAll(@RequestParam(name = "page", defaultValue = "0") int page) {
        Page<Demo> demo = demoService.getAll(PageRequest.of(page, 2));
        return new ResponseEntity<>(demo, HttpStatus.OK);
    }

}
