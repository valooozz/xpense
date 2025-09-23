package com.demo.xpense.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.xpense.dto.response.AmountByGroupement;
import com.demo.xpense.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByDateDesc(Long userId);

    List<Transaction> findTop4ByUserIdOrderByDateDesc(Long userId);

    @Query(
      value = """
        SELECT 
            TO_CHAR(t.date, 'YYYY-MM') AS mois,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', t.id,
                    'title', t.title,
                    'type', t.type,
                    'category', c.label,
                    'amount', t.amount,
                    'date', t.date
                )
                ORDER BY t.date DESC
            ) AS transactions
        FROM transaction t
        LEFT OUTER JOIN category c ON t.category_id = c.id
        WHERE t.user_id = ?1
        GROUP BY TO_CHAR(t.date, 'YYYY-MM')
        ORDER BY mois DESC
        """,
      nativeQuery = true
    )
    List<Object[]> findTransactionsByUserIdGroupedByMonth(Long userID);

    @Query("""
        SELECT t.category.label as grouping, SUM(t.amount) as amount 
        FROM Transaction t 
        WHERE t.user.id = ?1 AND t.type = 0 
        GROUP BY t.category.label
        ORDER BY amount DESC
    """)
    List<AmountByGroupement> getStatsByCategory(Long userId);

    @Query("""
        SELECT EXTRACT(MONTH FROM t.date) as grouping, SUM(t.amount) as amount 
        FROM Transaction t 
        WHERE t.user.id = ?1 AND t.type = 0 
        GROUP BY EXTRACT(MONTH FROM t.date)
        ORDER BY grouping DESC
    """)
    List<AmountByGroupement> getStatsByMonth(Long userId, Pageable pageable);
}
