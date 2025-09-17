package com.demo.xpense.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.TransactionResponseDto;
import com.demo.xpense.service.TransactionService;


@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDto>> getTransactionsFromUser(@PathVariable Long userId) {
        List<TransactionResponseDto> response = transactionService.getAllTransactionsByUserId(userId);
        return ResponseEntity.ok(response);
    }
}
