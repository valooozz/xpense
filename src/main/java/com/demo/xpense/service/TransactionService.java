package com.demo.xpense.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.model.Transaction;
import com.demo.xpense.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<TransactionResponseDto> getAllTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserId(userId)
                .stream()
                .map(TransactionResponseDto::fromEntity)
                .toList();
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
