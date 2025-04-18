package com.quizeserver.quizserver.service.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizeserver.quizserver.entities.User;
import com.quizeserver.quizserver.enums.UserRole;
import com.quizeserver.quizserver.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void createAdminUser() {
        User existingAdminUser = userRepository.findByRole(UserRole.ADMIN);
        if (existingAdminUser == null) {
            User adminUser = new User();  // Use the correct User entity
            adminUser.setName("Admin");
            adminUser.setEmail("admin@gmail.com");
            adminUser.setRole(UserRole.ADMIN);
            adminUser.setPassword("admin");  // You should hash the password in production

            userRepository.save(adminUser);  
        }
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        // Fix: Return true if user is found, false otherwise
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public User createUser(User user) {
        user.setRole(UserRole.USER);  // Default role set to USER
        return userRepository.save(user);
    }

    @Override
    public User login(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())) {
            return optionalUser.get();
        }
        return null;
    }
}
