package com.example.demochart.service;

import com.example.demochart.dto.IChart;
import com.example.demochart.model.Chart;

import java.sql.Date;
import java.util.List;

public interface IChartService {
    List<IChart> findAll (Date start, Date end);
    List<Chart> findAllList ();
}
