package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository repository;

    public Cart addToCart(Cart cart) {
        return repository.save(cart);
    }

    public List<Cart> getCartItems() {
        return repository.findAll();
    }

    public void removeItem(Long id) {
        repository.deleteById(id);
    }

    public void clearCart() {
        repository.deleteAll();
    }
}