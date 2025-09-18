package com.demo.xpense.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.xpense.dto.response.AmountByCategory;
import com.demo.xpense.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByDateDesc(Long userId);

    @Query("SELECT t.category as category, SUM(t.amount) as amount FROM Transaction t WHERE t.user.id = ?1 GROUP BY t.category")
    List<AmountByCategory> getStatsByCategory(Long userId);
}
