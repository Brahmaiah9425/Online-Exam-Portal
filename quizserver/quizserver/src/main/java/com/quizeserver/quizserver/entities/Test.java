//package com.quizeserver.quizserver.entities;
//
//import com.quizeserver.quizserver.dto.TestDTO;
//import com.quizeserver.quizserver.dto.QuestionDTO;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
//import lombok.Data;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Entity
//@Data
//public class Test {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
//    private String description;
//    private int time;
//
//    @OneToMany(mappedBy = "test")
//    private List<Question> questions;
//
//    // Method to convert Test entity to TestDTO
//    public TestDTO toDTO() {
//        TestDTO dto = new TestDTO();
//        dto.setId(this.id);
//        dto.setTitle(this.title);
//        dto.setDescription(this.description);
//        dto.setTime(this.time);
//
//        // Convert questions to DTOs and set them
//        List<QuestionDTO> questionDTOs = this.questions.stream()
//                .map(Question::toDTO)
//                .collect(Collectors.toList());
//        dto.setQuestions(questionDTOs);
//
//        return dto;
//    }
//}
package com.quizeserver.quizserver.entities;

import com.quizeserver.quizserver.dto.TestDTO;
import com.quizeserver.quizserver.dto.QuestionDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
public class Test {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String title;
        private String description;
        private int time;

        @OneToMany(mappedBy = "test", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        private List<Question> questions = new ArrayList<>();  // Initialize here

        // Constructor to ensure questions is never null
        public Test() {
            this.questions = new ArrayList<>();
        }

        // Modified toDTO method with null check
        public TestDTO toDTO() {
            TestDTO dto = new TestDTO();
            dto.setId(this.id);
            dto.setTitle(this.title);
            dto.setDescription(this.description);
            dto.setTime(this.time);

            // Add null check before streaming
            if (this.questions != null) {
                List<QuestionDTO> questionDTOs = this.questions.stream()
                        .map(Question::toDTO)
                        .collect(Collectors.toList());
                dto.setQuestions(questionDTOs);
            } else {
                dto.setQuestions(new ArrayList<>());
            }

            return dto;
        }
    }
