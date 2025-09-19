package com.demo.xpense.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.demo.xpense.dto.response.AmountByGroupement;
import com.demo.xpense.repository.TransactionRepository;

@Service
public class StatsService {

    private final TransactionRepository transactionRepository;

    public StatsService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<AmountByGroupement> getStatsByCategory(Long userId) {
        return transactionRepository.getStatsByCategory(userId);
    }

    public List<AmountByGroupement> getStatsByMonth(Long userId) {
        return transactionRepository.getStatsByMonth(userId);
    }
}
