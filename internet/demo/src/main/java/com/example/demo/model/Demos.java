package com.example.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Demos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDemos;
    @Column
    private String name;
    @OneToMany(mappedBy = "demos")
    private Set<Demo> demoSet;

    public Integer getIdDemos() {
        return idDemos;
    }

    public void setIdDemos(Integer idDemos) {
        this.idDemos = idDemos;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Demo> getDemoSet() {
        return demoSet;
    }

    public void setDemoSet(Set<Demo> demoSet) {
        this.demoSet = demoSet;
    }
}
