package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.dto.LoginResponse;
import com.example.demo.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    

    public User register(RegisterRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        return repo.save(user);
    }

    public LoginResponse login(LoginRequest request) {

    System.out.println("EMAIL = " + request.getEmail());

    User user = repo.findByEmail(request.getEmail());

    System.out.println("USER FOUND = " + user);

    if (user != null) {

        System.out.println(
                "PASSWORD MATCH = " +
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()));
    }

    if (user != null &&
            passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword())) {

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        System.out.println("TOKEN GENERATED");

        return new LoginResponse(token);
    }

    System.out.println("LOGIN FAILED");

    return null;
}
}