package com.anuj.service;

import com.anuj.exception.CartItemException;
import com.anuj.exception.UserException;
import com.anuj.model.Cart;
import com.anuj.model.CartItem;
import com.anuj.model.Product;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem);
	
	public CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws CartItemException,UserException;
	
	public CartItem isCartItemExist(Cart cart,Product product,String size,Long userd);
	
	public void removeCartItem(Long userId,Long cartItemId) throws CartItemException,UserException;
	
	public CartItem findCartItemById(Long cartItemId) throws CartItemException;
}
