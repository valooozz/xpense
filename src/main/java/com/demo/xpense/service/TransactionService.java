package com.demo.xpense.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.demo.xpense.dto.request.TransactionCreateRequestDto;
import com.demo.xpense.dto.response.AmountByCategory;
import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.model.Transaction;
import com.demo.xpense.model.User;
import com.demo.xpense.model.enums.TransactionType;
import com.demo.xpense.repository.TransactionRepository;
import com.demo.xpense.repository.UserRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<TransactionResponseDto> getAllTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId)
                .stream()
                .map(TransactionResponseDto::fromEntity)
                .toList();
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public TransactionResponseDto createTransaction(TransactionCreateRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = new Transaction();
        transaction.setTitle(requestDto.getTitle());
        transaction.setType(requestDto.getType() != null ? requestDto.getType() : TransactionType.EXPENSE);
        transaction.setCategory(requestDto.getCategory());
        transaction.setAmount(requestDto.getAmount());
        transaction.setDate(requestDto.getDate() != null ? requestDto.getDate() : new Date());
        transaction.setUser(user);

        Transaction saved = transactionRepository.save(transaction);
        return TransactionResponseDto.fromEntity(saved);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public List<AmountByCategory> getStatsByCategory(Long userId) {
        return transactionRepository.getStatsByCategory(userId);
    }
}
