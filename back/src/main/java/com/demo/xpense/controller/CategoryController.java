package com.demo.xpense.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.transaction.FormCategoryResponseDto;
import com.demo.xpense.service.CategoryService;



@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public List<FormCategoryResponseDto> getCategories() {
        return categoryService.getAllCategories();
    }
    
}
