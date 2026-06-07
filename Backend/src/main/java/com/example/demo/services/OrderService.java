package com.example.demo.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Orders;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrdersRepository;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartRepository cartRepository;

    public Orders placeOrder(
            Orders order,
            String email) {

        order.setOrderDate(LocalDateTime.now());

        order.setUserEmail(email);

        Orders savedOrder =
                ordersRepository.save(order);

        cartRepository.deleteAll();

        return savedOrder;
    }

    public List<Orders> getOrders(
            String email) {

        return ordersRepository
                .findByUserEmail(email);
    }
}