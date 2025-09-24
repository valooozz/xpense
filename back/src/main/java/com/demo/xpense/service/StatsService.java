package com.demo.xpense.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.demo.xpense.dto.response.stats.AmountByGroupement;
import com.demo.xpense.repository.TransactionRepository;

@Service
public class StatsService {

    private final TransactionRepository transactionRepository;
    private final SecurityService securityService;

    public StatsService(TransactionRepository transactionRepository, SecurityService securityService) {
        this.transactionRepository = transactionRepository;
        this.securityService = securityService;
    }

    public List<AmountByGroupement> getStatsByCategory() {
        Long currentUserId = securityService.getCurrentUserId();
        return transactionRepository.getStatsByCategory(currentUserId);
    }

    public List<AmountByGroupement> getStatsByMonth(Integer limit) {
        Long currentUserId = securityService.getCurrentUserId();
        Pageable pageable = limit != null ? PageRequest.of(0, limit) : Pageable.unpaged();
        return transactionRepository.getStatsByMonth(currentUserId, pageable);
    }
}
