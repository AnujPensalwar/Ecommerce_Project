package com.anuj.service;

import com.anuj.exception.ProductException;
import com.anuj.model.Cart;
import com.anuj.model.User;
import com.anuj.request.AddItemRequest;

public interface CartService {

	public Cart createCart(User user);
	
	public String addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);
}
