package com.demo.xpense.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.request.UserLoginRequestDto;
import com.demo.xpense.dto.response.UserResponseDto;
import com.demo.xpense.service.UserService;


@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserLoginRequestDto credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();
        UserResponseDto response = userService.getUserByUsernameAndPassword(username, password);
        return ResponseEntity.ok(response);
    }
}
