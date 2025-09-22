package com.demo.xpense.dto.response;

import java.util.Date;

import com.demo.xpense.model.Transaction;
import com.demo.xpense.model.enums.TransactionType;

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
    private String title;
    private TransactionType type;
    private String category;
    private double amount;
    private Date date;

    public static TransactionResponseDto fromEntity(Transaction transaction) {
        return new TransactionResponseDto(
                transaction.getId(),
                transaction.getTitle(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getAmount(),
                transaction.getDate()
        );
    }
}
