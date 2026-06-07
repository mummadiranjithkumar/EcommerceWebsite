package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Cart;
import com.example.demo.services.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        return service.addToCart(cart);
    }

    @GetMapping
    public List<Cart> getCartItems() {
        return service.getCartItems();
    }

    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id) {

        service.removeItem(id);

        return "Item Removed";
    }
}