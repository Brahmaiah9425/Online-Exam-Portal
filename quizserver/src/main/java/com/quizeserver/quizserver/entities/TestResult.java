package com.quizeserver.quizserver.entities;

import com.quizeserver.quizserver.dto.TestResultDTO;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int totalQuestions;
    private int correctAnswers;
    private double percentage;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Updated getDto() method to return testName and username instead of IDs
    public TestResultDTO getDto() {
        TestResultDTO dto = new TestResultDTO();
        dto.setId(id);
        dto.setTotalQuestions(totalQuestions);
        dto.setCorrectAnswers(correctAnswers);
        dto.setPercentage(percentage);
        
        // Set the testName and username (instead of testId and userId)
        dto.setTestName(test.getTitle());  // Assuming `getTitle()` is the name of the test
        dto.setUsername(user.getName());  // Assuming `getName()` is the username
        
        return dto;
    }
}
