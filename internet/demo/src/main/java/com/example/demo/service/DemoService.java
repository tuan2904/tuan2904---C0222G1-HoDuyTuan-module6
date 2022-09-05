package com.example.demo.service;

import com.example.demo.model.Demo;
import com.example.demo.repository.DemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DemoService implements IDemoService {
    @Autowired
    private DemoRepository demoRepository;

    @Override
    public Page<Demo> getAll(Pageable pageable) {
        return demoRepository.findAll(pageable);
    }
}
