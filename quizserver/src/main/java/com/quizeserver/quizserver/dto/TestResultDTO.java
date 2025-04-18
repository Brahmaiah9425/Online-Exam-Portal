package com.quizeserver.quizserver.dto;

import lombok.Data;

@Data
public class TestResultDTO {
    private Long id;  
    private int totalQuestions;
    private int correctAnswers;
    private double percentage;
    private String testName;  // Changed to String for test name
    private String username;  // Changed to String for username
}
