package com.demo.xpense.controller;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.xpense.dto.response.ErrorResponseDto;
import com.demo.xpense.dto.response.SuccessResponseDto;
import com.demo.xpense.model.User;
import com.demo.xpense.service.UserService;
import com.demo.xpense.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
        String username = body.get("username");
        String password = body.get("password");

        User user = userService.getUserByUsername(username);
        if (user != null && userService.checkPassword(password, user.getPassword())) {
            String token = jwtUtil.generateToken(user.getId());
            
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)  
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 60)  // 1h
                    .sameSite("Strict")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(new SuccessResponseDto("Login réussi"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body, HttpServletResponse response) {
        String username = body.get("username");
        String password = body.get("password");

        if (userService.userExists(username)) {
            return ResponseEntity.badRequest().body(new ErrorResponseDto("Un utilisateur avec ce nom existe déjà.", 400));
        }

        userService.registerUser(username, password);
        return ResponseEntity.ok(new SuccessResponseDto("Création d'utilisateur réussie"));
    }
}
