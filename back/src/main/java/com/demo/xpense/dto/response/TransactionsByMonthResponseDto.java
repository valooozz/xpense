package com.demo.xpense.dto.response;

import java.util.List;

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

}
