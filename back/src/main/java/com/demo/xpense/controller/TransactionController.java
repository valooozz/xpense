package com.demo.xpense.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.request.transaction.TransactionCreateRequestDto;
import com.demo.xpense.dto.request.transaction.TransactionUpdateRequestDto;
import com.demo.xpense.dto.response.transaction.TransactionResponseDto;
import com.demo.xpense.dto.response.transaction.TransactionsByMonthResponseDto;
import com.demo.xpense.service.TransactionService;


@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<TransactionsByMonthResponseDto>> getAllTransactionsFromUser() {
        List<TransactionsByMonthResponseDto> response = transactionService.getAllTransactionsByUser();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/last")
    public ResponseEntity<List<TransactionsByMonthResponseDto>> getLastTransactionsFromUser() {
        List<TransactionsByMonthResponseDto> response = transactionService.getLastTransactionsByUser();
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<TransactionResponseDto> createTransaction(@RequestBody TransactionCreateRequestDto newTransaction) {
        TransactionResponseDto response = transactionService.createTransaction(newTransaction);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{transactionId}")
    public ResponseEntity<TransactionResponseDto> editTransaction(@PathVariable Long transactionId, @RequestBody TransactionUpdateRequestDto updatedTransaction) {
        TransactionResponseDto response = transactionService.updateTransaction(transactionId, updatedTransaction);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Map<String, String>> deleteTransaction(@PathVariable Long transactionId) {
        transactionService.deleteTransaction(transactionId);
        return ResponseEntity.ok(Map.of("message", "Tansaction deleted successfully"));
    }
    
}
