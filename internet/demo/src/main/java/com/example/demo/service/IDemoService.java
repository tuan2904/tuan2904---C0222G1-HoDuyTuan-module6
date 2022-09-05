package com.example.demo.service;

import com.example.demo.model.Demo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IDemoService {
    Page<Demo> getAll(Pageable pageable);
}
