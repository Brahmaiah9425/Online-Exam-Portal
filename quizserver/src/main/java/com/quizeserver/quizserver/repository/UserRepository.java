package com.quizeserver.quizserver.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quizeserver.quizserver.entities.User;
import com.quizeserver.quizserver.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByRole(UserRole role);
    
    Optional<User> findByEmail(String email);  
}
