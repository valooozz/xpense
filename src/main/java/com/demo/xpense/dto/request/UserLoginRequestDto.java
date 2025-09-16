package com.demo.xpense.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequestDto {

    @NotBlank(message = "mandatory username")
    private String username;
    
    @NotBlank(message = "mandatory password")
    private String password;
}
