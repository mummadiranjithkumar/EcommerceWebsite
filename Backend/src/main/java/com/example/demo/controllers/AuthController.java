package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.services.UserService;
import com.example.demo.dto.LoginResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {

        return service.register(request);
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

    return service.login(request);
}
}