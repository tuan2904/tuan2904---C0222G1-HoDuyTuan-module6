package com.example.demochart.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Chart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private double timePlays;
    @Column
    private String nameComputer;
    @Column
    private Date dateStar;
    public Date getDateStar() {
        return dateStar;
    }

    public Chart() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getTimePlays() {
        return timePlays;
    }

    public void setTimePlays(double timePlays) {
        this.timePlays = timePlays;
    }

    public String getNameComputer() {
        return nameComputer;
    }

    public void setNameComputer(String nameComputer) {
        this.nameComputer = nameComputer;
    }

    public void setDateStar(Date dateStar) {
        this.dateStar = dateStar;
    }

}
