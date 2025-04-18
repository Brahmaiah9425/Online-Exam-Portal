package com.quizeserver.quizserver.dto;

import lombok.Data;
import java.util.List;

@Data
public class TestDetailsDTO {
    private TestDTO testDTO;  // Corrected variable name
    private List<QuestionDTO> questions;  // Corrected class name and variable type
    private int time;  // Added time field

    // You can use Lombok's @Data to generate the getter and setter methods
}
