package com.quizeserver.quizserver.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizeserver.quizserver.entities.User;
import com.quizeserver.quizserver.service.User.UserService;

@RestController
@RequestMapping("api/auth")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;  // Correct usage of userService as injected instance

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        // Use the injected userService instance to check if the user exists
        if (userService.hasUserWithEmail(user.getEmail())) {  // Use userService to check if user exists
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        // Create the user if not already present
        User createdUser = userService.createUser(user);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created, try again later", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = userService.login(user);
        if (dbUser == null) {
            return new ResponseEntity<>("Wrong Credentials", HttpStatus.NOT_ACCEPTABLE); // Corrected this line
        }
        return new ResponseEntity<>(dbUser, HttpStatus.OK);
    }

    
}
