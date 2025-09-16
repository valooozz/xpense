package com.demo.xpense.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @GetMapping("/username")
    public String getUsername() {
        return "valoozz";
    }
    
}
