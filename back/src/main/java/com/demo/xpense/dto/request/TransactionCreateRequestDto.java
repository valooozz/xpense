package com.demo.xpense.dto.request;

import java.util.Date;

import com.demo.xpense.model.enums.TransactionType;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionCreateRequestDto {

    @NotBlank(message = "mandatory title")
    private String title;

    private TransactionType type;

    @NotBlank(message = "mandatory amount")
    private double amount;

    private Date date;

    private Long categoryId;
    
    @NotBlank(message = "mandatory user ID")
    private Long userId;
}
