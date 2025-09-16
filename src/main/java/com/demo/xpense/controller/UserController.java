package com.demo.xpense.controller;

import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.UserResponseDto;
import com.demo.xpense.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable String username) {
        UserResponseDto response = userService.getUserByUsername(username);
        return ResponseEntity.ok(response);
    }
    
}
