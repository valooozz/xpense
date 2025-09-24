package com.demo.xpense.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.user.UserResponseDto;
import com.demo.xpense.model.User;
import com.demo.xpense.service.SecurityService;



@RestController
@RequestMapping("/api/user")
public class UserController {

    private final SecurityService securityService;

    public UserController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @GetMapping()
    public UserResponseDto getUser() {
        User user = securityService.getCurrentUser();
        return UserResponseDto.fromEntity(user);
    }
    
}
