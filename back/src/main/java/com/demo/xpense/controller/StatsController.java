package com.demo.xpense.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/category/{userId}")
    public ResponseEntity<List<AmountByGroupement>> getStatsByCategory(@PathVariable Long userId) {
        List<AmountByGroupement> response = statsService.getStatsByCategory(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/month/{userId}")
    public ResponseEntity<List<AmountByGroupement>> getStatsByMonth(
            @PathVariable Long userId, 
            @RequestParam(required = false) Integer limit
        ) {
        List<AmountByGroupement> response = statsService.getStatsByMonth(userId, limit);
        return ResponseEntity.ok(response);
    }
    
}
