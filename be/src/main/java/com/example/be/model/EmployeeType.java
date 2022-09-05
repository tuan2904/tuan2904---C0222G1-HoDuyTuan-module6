package com.example.be.model;

import javax.persistence.*;

@Entity
public class EmployeeType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idType;
    @Column
    private String name;
}
