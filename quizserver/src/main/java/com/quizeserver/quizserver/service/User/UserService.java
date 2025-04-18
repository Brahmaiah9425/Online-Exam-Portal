package com.quizeserver.quizserver.service.User;

import com.quizeserver.quizserver.entities.User;

public interface UserService {
    Boolean hasUserWithEmail(String email);  
    User createUser(User user);
    User login(User user);  
}
