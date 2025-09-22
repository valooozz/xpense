package com.demo.xpense.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.demo.xpense.dto.request.TransactionCreateRequestDto;
import com.demo.xpense.dto.request.TransactionUpdateRequestDto;
import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.dto.response.TransactionsByMonthResponseDto;
import com.demo.xpense.model.Transaction;
import com.demo.xpense.model.User;
import com.demo.xpense.model.enums.TransactionType;
import com.demo.xpense.repository.TransactionRepository;
import com.demo.xpense.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public List<TransactionsByMonthResponseDto> getAllTransactionsByUserId(Long userId) {
        List<Object[]> results = transactionRepository.findTransactionsByUserIdGroupedByMonth(userId);

        return results.stream()
            .map(row -> {
                String mois = (String) row[0];
                String transactionsJson = row[1].toString();

                List<TransactionResponseDto> transactions;
                try {
                    transactions = objectMapper.readValue(
                        transactionsJson,
                        objectMapper.getTypeFactory().constructCollectionType(List.class, TransactionResponseDto.class)
                    );
                } catch (Exception e) {
                    throw new RuntimeException("Erreur de parsing JSON des transactions", e);
                }

                return new TransactionsByMonthResponseDto(mois, transactions);
            })
            .toList();
    }

    public List<TransactionsByMonthResponseDto> getLastTransactionsByUserId(Long userId) {
        List<TransactionResponseDto> transactions = transactionRepository.findTop4ByUserIdOrderByDateDesc(userId)
                .stream()
                .map(TransactionResponseDto::fromEntity)
                .toList();
        TransactionsByMonthResponseDto response = new TransactionsByMonthResponseDto("Dernières transactions", transactions);
        return List.of(response);
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

    public TransactionResponseDto updateTransaction(Long id, TransactionUpdateRequestDto updatedTransaction) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (updatedTransaction.getTitle() != null) {
            transaction.setTitle(updatedTransaction.getTitle());
        }
        if (updatedTransaction.getType() != null) {
            transaction.setType(updatedTransaction.getType());
        }
        if (updatedTransaction.getCategory() != null) {
            transaction.setCategory(updatedTransaction.getCategory());
        }
        if (updatedTransaction.getAmount() != 0) {
            transaction.setAmount(updatedTransaction.getAmount());
        }
        if (updatedTransaction.getDate() != null) {
            transaction.setDate(updatedTransaction.getDate());
        }

        Transaction updated = transactionRepository.save(transaction);
        return TransactionResponseDto.fromEntity(updated);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
