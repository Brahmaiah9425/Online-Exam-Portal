package com.quizeserver.quizserver.service.test;

import java.util.List;
import com.quizeserver.quizserver.dto.QuestionDTO;
import com.quizeserver.quizserver.dto.SubmitTestDTO;
import com.quizeserver.quizserver.dto.TestDTO;
import com.quizeserver.quizserver.dto.TestDetailsDTO;
import com.quizeserver.quizserver.dto.TestResultDTO;

public interface TestService {
    TestDTO createTest(TestDTO dto);
    QuestionDTO addQuestionInTest(QuestionDTO dto);
    
    // Method to get all tests
    List<TestDTO> getAllTests();
    TestDetailsDTO getAllQuestionsByTest(Long id);
    TestResultDTO submitTest(SubmitTestDTO request);
    List<TestResultDTO> getAllTestResults();
    List<TestResultDTO> getAllTestResultsForUser(Long userId);
    public List<TestDTO> searchTestsByName(String name);
}
