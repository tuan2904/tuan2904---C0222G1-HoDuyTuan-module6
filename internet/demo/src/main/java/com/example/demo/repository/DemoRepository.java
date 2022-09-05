package com.example.demo.repository;

import com.example.demo.model.Demo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface DemoRepository extends JpaRepository<Demo,Integer> {

    @Query(value="select * from demo" , nativeQuery=true)
    Page<Demo> findAll(Pageable pageable);

}
