package com.quizeserver.quizserver.service.test;

import org.springframework.stereotype.Service;
import com.quizeserver.quizserver.dto.QuestionDTO;
import com.quizeserver.quizserver.dto.QuestionResponse;
import com.quizeserver.quizserver.dto.SubmitTestDTO;
import com.quizeserver.quizserver.dto.TestDTO;
import com.quizeserver.quizserver.dto.TestDetailsDTO;
import com.quizeserver.quizserver.dto.TestResultDTO;
import com.quizeserver.quizserver.entities.Test;
import com.quizeserver.quizserver.entities.TestResult;
import com.quizeserver.quizserver.entities.User;
import com.quizeserver.quizserver.entities.Question;
import com.quizeserver.quizserver.repository.QuestionRepository;
import com.quizeserver.quizserver.repository.TestRepository;
import com.quizeserver.quizserver.repository.TestResultRepository;
import com.quizeserver.quizserver.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private TestResultRepository testResultRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Method to create a new test
    public TestDTO createTest(TestDTO dto) {
        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime());

        return testRepository.save(test).toDTO();  // Assuming toDTO() method exists in Test entity
    }

    // Method to add a question to an existing test
    public QuestionDTO addQuestionInTest(QuestionDTO dto) {
        Optional<Test> optionalTest = testRepository.findById(dto.getId());
        if (optionalTest.isPresent()) {
            Question question = new Question();
            question.setTest(optionalTest.get());
            question.setQuestionText(dto.getQuestionText());
            question.setOptionA(dto.getOptionA());
            question.setOptionB(dto.getOptionB());
            question.setOptionC(dto.getOptionC());
            question.setOptionD(dto.getOptionD());
            question.setCorrectOption(dto.getCorrectOption());

            return questionRepository.save(question).toDTO();  // Assuming toDTO() method exists in Question entity
        }

        throw new EntityNotFoundException("Test Not Found");
    }

    // Method to get all tests
    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream()
                .peek(test -> test.setTime(test.getQuestions().size() * test.getTime())) // Calculate the new time
                .map(test -> test.toDTO())
                .collect(Collectors.toList());
    }

    // Method to get all questions for a specific test by its ID
    public TestDetailsDTO getAllQuestionsByTest(Long id) {
        Optional<Test> optionalTest = testRepository.findById(id);
        TestDetailsDTO testDetailsDTO = new TestDetailsDTO();

        if (optionalTest.isPresent()) {
            TestDTO testDTO = optionalTest.get().toDTO();  // Assuming toDTO() method exists in Test entity
            testDTO.setTime(optionalTest.get().getTime() * optionalTest.get().getQuestions().size());
            testDetailsDTO.setTestDTO(testDTO);
            testDetailsDTO.setQuestions(optionalTest.get().getQuestions().stream()
                    .map(question -> question.toDTO())  // Convert each Question to QuestionDTO
                    .collect(Collectors.toList()));
            return testDetailsDTO;
        }
        return testDetailsDTO;  // Return an empty DTO if Test not found
    }

    // Method to submit a test and calculate the score
    public TestResultDTO submitTest(SubmitTestDTO request) {
        Test test = testRepository.findById(request.getTestId()).orElseThrow(() -> new EntityNotFoundException("Test not found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        int correctAnswers = 0;
        
        for (QuestionResponse response : request.getResponses()) {
            Question question = questionRepository.findById(response.getQuestionId()).orElseThrow(() -> new EntityNotFoundException("Question not found"));
            if (question.getCorrectOption().equals(response.getSelectedOption())) {
                correctAnswers++;
            }
        }
        
        int totalQuestions = test.getQuestions().size();
        double percentage = ((double) correctAnswers / totalQuestions) * 100;
        
        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);
        //return testResultRepository.save(testResult).getDto();
        
        TestResultDTO resultDTO = testResultRepository.save(testResult).getDto();
        
        // Set the Test Name and User Name (instead of IDs)
        resultDTO.setTestName(test.getTitle());  // Use test.getTitle() instead of testId
        resultDTO.setUsername(user.getName());  // Use user.getName() instead of userId
        
        return resultDTO;
    }

    // Method to get all test results
    public List<TestResultDTO> getAllTestResults() {
        return testResultRepository.findAll().stream()
                .map(testResult -> {
                    TestResultDTO resultDTO = testResult.getDto();
                    resultDTO.setTestName(testResult.getTest().getTitle()); // Add test name
                    resultDTO.setUsername(testResult.getUser().getName()); // Add user name
                    return resultDTO;
                })
                .collect(Collectors.toList());
    }
    public List<TestResultDTO> getAllTestResultsForUser(Long userId) {
        return testResultRepository.findAllByUserId(userId)
               .stream()
               .map(TestResult::getDto)
               .collect(Collectors.toList());
    }
    public List<TestDTO> searchTestsByName(String name) {
        return testRepository.findAll().stream()
                .filter(test -> test.getTitle().toLowerCase().contains(name.toLowerCase()))
                .map(test -> test.toDTO())
                .collect(Collectors.toList());
    }

}
