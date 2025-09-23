package com.demo.xpense.service;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.demo.xpense.model.User;
import com.demo.xpense.repository.UserRepository;

@Service
public class SecurityService {

    private final UserRepository userRepository;

    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long getCurrentUserId() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return Long.parseLong(userId);
    }

    public User getCurrentUser() {
        Long id = getCurrentUserId();
        return userRepository.findById(id).orElseThrow(() -> new AccessDeniedException("Vous n'avez pas le droit d'accéder à cette ressource"));
    }

    public void validateUserAccess(Long userId) {
        User currentUser = getCurrentUser();
        if (!currentUser.getId().equals(userId)) {
            throw new AccessDeniedException("Vous n'avez pas le droit d'accéder à cette ressource");
        }
    }
}
