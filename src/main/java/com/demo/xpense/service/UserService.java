package com.demo.xpense.service;

import com.demo.xpense.dto.response.UserResponseDto;
import com.demo.xpense.model.User;
import com.demo.xpense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserResponseDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponseDto.fromEntity(user);
    }

    public UserResponseDto getUserByUsernameAndPassword(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password).orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponseDto.fromEntity(user);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
