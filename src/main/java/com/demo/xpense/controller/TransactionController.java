package com.demo.xpense.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.request.TransactionCreateRequestDto;
import com.demo.xpense.dto.response.AmountByGroupement;
import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.service.TransactionService;



@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDto>> getTransactionsFromUser(@PathVariable Long userId) {
        List<TransactionResponseDto> response = transactionService.getAllTransactionsByUserId(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/new")
    public ResponseEntity<TransactionResponseDto> createTransaction(@RequestBody TransactionCreateRequestDto newTransaction) {
        TransactionResponseDto response = transactionService.createTransaction(newTransaction);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats/category/{userId}")
    public ResponseEntity<List<AmountByGroupement>> getStatsByCategory(@PathVariable Long userId) {
        List<AmountByGroupement> response = transactionService.getStatsByCategory(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats/month/{userId}")
    public ResponseEntity<List<AmountByGroupement>> getStatsByMonth(@PathVariable Long userId) {
        List<AmountByGroupement> response = transactionService.getStatsByMonth(userId);
        return ResponseEntity.ok(response);
    }
    
}
