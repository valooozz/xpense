package com.demo.xpense.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.AmountByGroupement;
import com.demo.xpense.service.StatsService;


@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/category")
    public ResponseEntity<List<AmountByGroupement>> getStatsByCategory() {
        List<AmountByGroupement> response = statsService.getStatsByCategory();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/month")
    public ResponseEntity<List<AmountByGroupement>> getStatsByMonth(@RequestParam(required = false) Integer limit) {
        List<AmountByGroupement> response = statsService.getStatsByMonth(limit);
        return ResponseEntity.ok(response);
    }
    
}
