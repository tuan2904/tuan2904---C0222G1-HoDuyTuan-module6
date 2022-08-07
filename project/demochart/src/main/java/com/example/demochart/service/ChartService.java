package com.example.demochart.service;

import com.example.demochart.dto.IChart;
import com.example.demochart.model.Chart;
import com.example.demochart.repository.IChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ChartService implements IChartService{
    @Autowired
    private IChartRepository chartRepository;
    @Override
    public List<IChart> findAll(Date start, Date end) {
        return chartRepository.findAllChart(start,end);
    }

    @Override
    public List<Chart> findAllList() {
        return chartRepository.findAll();
    }
}
