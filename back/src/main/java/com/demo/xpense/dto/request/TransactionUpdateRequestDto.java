package com.demo.xpense.dto.request;

import java.util.Date;

import com.demo.xpense.model.enums.TransactionType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionUpdateRequestDto {

    private String title;

    private TransactionType type;

    private Long categoryId;

    private double amount;
    
    private Date date;
}
