package com.example.demochart.repository;

import com.example.demochart.dto.IChart;
import com.example.demochart.model.Chart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

@Repository
@Transactional
public interface IChartRepository extends JpaRepository<Chart, Integer> {
    @Query(nativeQuery = true, value = "select name_computer as computer,time_plays as time from chart as c where (c.date_star > date (:start)) and (c.date_star < date (:endDate))")
    List<IChart> findAllChart(Date start, Date endDate);

    @Query(value = "Select * from chart", nativeQuery = true)
    List<Chart> findAll();
}
