package com.example.demochart.controller;

import com.example.demochart.dto.IChart;
import com.example.demochart.model.Chart;
import com.example.demochart.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChartController {
    @Autowired
    private ChartService chartService;

    @GetMapping(value = "/list/{start}/{end}")
    public ResponseEntity<?> findAll(@PathVariable Date start, @PathVariable Date end) {
        List<IChart> charts = chartService.findAll(start,end);
        if (charts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(charts,HttpStatus.OK);
    }

    @GetMapping(value = "/list")
    public ResponseEntity<Iterable<Chart>> findAllChart() {
        List<Chart> tickets = chartService.findAllList();
        if (tickets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }
}
