package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Orders;
import com.example.demo.services.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public Orders placeOrder(
            @RequestBody Orders order,
            Authentication authentication) {

        String email = authentication.getName();

        return service.placeOrder(order, email);
    }

    @GetMapping
    public List<Orders> getOrders(
            Authentication authentication) {

        String email = authentication.getName();

        return service.getOrders(email);
    }
}