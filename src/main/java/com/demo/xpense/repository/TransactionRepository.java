package com.demo.xpense.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.xpense.dto.response.AmountByGroupement;
import com.demo.xpense.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByDateDesc(Long userId);

    @Query("SELECT t.category as grouping, SUM(t.amount) as amount FROM Transaction t WHERE t.user.id = ?1 AND t.type = 0 GROUP BY t.category")
    List<AmountByGroupement> getStatsByCategory(Long userId);

    @Query("SELECT EXTRACT(MONTH FROM t.date) as grouping, SUM(t.amount) as amount FROM Transaction t WHERE t.user.id = ?1 AND t.type = 0 GROUP BY EXTRACT(MONTH FROM t.date)")
    List<AmountByGroupement> getStatsByMonth(Long userId);
}
