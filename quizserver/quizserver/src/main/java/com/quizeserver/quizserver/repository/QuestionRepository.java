package com.quizeserver.quizserver.repository;

import com.quizeserver.quizserver.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    // Additional query methods can be added here if needed
}
