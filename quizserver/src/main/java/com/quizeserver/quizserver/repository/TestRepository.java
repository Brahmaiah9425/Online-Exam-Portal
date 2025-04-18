package com.quizeserver.quizserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quizeserver.quizserver.entities.Test;

public interface TestRepository extends JpaRepository<Test, Long> {
    // No additional custom query methods are required at the moment
}
