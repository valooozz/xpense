package com.demo.xpense.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.demo.xpense.dto.response.transaction.FormCategoryResponseDto;
import com.demo.xpense.model.Category;
import com.demo.xpense.repository.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<FormCategoryResponseDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(FormCategoryResponseDto::fromEntity)
                .toList();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
}
