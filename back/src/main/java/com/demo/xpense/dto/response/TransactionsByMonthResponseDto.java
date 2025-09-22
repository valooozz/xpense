package com.demo.xpense.dto.response;

import java.util.List;

import com.demo.xpense.model.Transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionsByMonthResponseDto {
    
    private String month;
    private List<TransactionResponseDto> transactions;

    public void addTransaction(Transaction newTransaction) {
        transactions.add(TransactionResponseDto.fromEntity(newTransaction));
    }
}
