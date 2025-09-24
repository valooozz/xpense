package com.demo.xpense.dto.response.transaction;

import com.demo.xpense.model.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormCategoryResponseDto {
    
    private String label;

    private String value;

    public static FormCategoryResponseDto fromEntity(Category category) {
        return new FormCategoryResponseDto(
            category.getLabel(),
            Long.toString(category.getId())
        );
    }
}
