package com.demo.xpense.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.demo.xpense.dto.request.TransactionCreateRequestDto;
import com.demo.xpense.dto.request.TransactionUpdateRequestDto;
import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.dto.response.TransactionsByMonthResponseDto;
import com.demo.xpense.model.Category;
import com.demo.xpense.model.Transaction;
import com.demo.xpense.model.User;
import com.demo.xpense.repository.CategoryRepository;
import com.demo.xpense.repository.TransactionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final ObjectMapper objectMapper;
    private final SecurityService securityService;

    public TransactionService(
            TransactionRepository transactionRepository, 
            CategoryRepository categoryRepository, 
            ObjectMapper objectMapper, 
            SecurityService securityService
        ) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.objectMapper = objectMapper;
        this.securityService = securityService;
    }

    public List<TransactionsByMonthResponseDto> getAllTransactionsByUser() {
        Long currentUserId = securityService.getCurrentUserId();
        List<Object[]> results = transactionRepository.findTransactionsByUserIdGroupedByMonth(currentUserId);

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

    public List<TransactionsByMonthResponseDto> getLastTransactionsByUser() {
        Long currentUserId = securityService.getCurrentUserId();
        List<TransactionResponseDto> transactions = transactionRepository.findTop4ByUserIdOrderByDateDesc(currentUserId)
                .stream()
                .map(TransactionResponseDto::fromEntity)
                .toList();
        TransactionsByMonthResponseDto response = new TransactionsByMonthResponseDto("Dernières transactions", transactions);
        return List.of(response);
    }

    public TransactionResponseDto createTransaction(TransactionCreateRequestDto requestDto) {
        User currentUser = securityService.getCurrentUser();

        Category category = requestDto.getCategoryId() != null ? categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")) : null;

        Transaction transaction = new Transaction();
        transaction.setTitle(requestDto.getTitle());
        transaction.setType(requestDto.getType());
        transaction.setCategory(category);
        transaction.setAmount(requestDto.getAmount());
        transaction.setDate(requestDto.getDate() != null ? requestDto.getDate() : new Date());
        transaction.setUser(currentUser);

        Transaction saved = transactionRepository.save(transaction);
        return TransactionResponseDto.fromEntity(saved);
    }

    public TransactionResponseDto updateTransaction(Long id, TransactionUpdateRequestDto updatedTransaction) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        securityService.validateUserAccess(transaction.getUser().getId());

        Category category = categoryRepository.findById(updatedTransaction.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (updatedTransaction.getTitle() != null) {
            transaction.setTitle(updatedTransaction.getTitle());
        }
        if (updatedTransaction.getType() != null) {
            transaction.setType(updatedTransaction.getType());
        }
        if (updatedTransaction.getCategoryId() != null) {
            transaction.setCategory(category);
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
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        securityService.validateUserAccess(transaction.getUser().getId());
        
        transactionRepository.deleteById(id);
    }
}
