package com.demo.xpense.dto.response;

import com.demo.xpense.model.Transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponseDto {

    private Long id;
    private String type;
    private String category;
    private double amount;

    public static TransactionResponseDto fromEntity(Transaction transaction) {
        return new TransactionResponseDto(
                transaction.getId(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getAmount()
        );
    }
}
