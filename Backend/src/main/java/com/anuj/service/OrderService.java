package com.anuj.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anuj.exception.OrderException;
import com.anuj.model.Address;
import com.anuj.model.Order;
import com.anuj.model.User;

@Service
public interface OrderService  {

	public Order createOrder(User user,Address shippingAddress);
	
	public Order findOrderById(Long orderid) throws OrderException;
	
	public List<Order> usersOrderHistory(Long userId);
	
	public Order placedOrder(Long orderId) throws OrderException;
	
	public Order confirmedOrder(Long orderId) throws OrderException;
	
	public Order shippedOrder(Long orderId) throws OrderException;
	
	public Order deliveredOrder(Long orderId) throws OrderException;
	
	public Order cancledOrder(Long orderId) throws OrderException;
	
	public List<Order>getAllorders();
	
	public void deleteOrder(Long orderId) throws OrderException;
	
}
