package com.demo.xpense.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.xpense.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserId(Long userId);
}
