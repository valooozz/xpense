package com.demo.xpense.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRegisterRequestDto {
    
    @NotBlank(message = "mandatory username")
    private String username;

    @NotBlank(message = "mandatory password")
    @Size(min = 8, message = "password must be at least 8 characters long")
    private String password;
}
