package com.anuj.service;

import org.springframework.stereotype.Service;

import com.anuj.exception.ProductException;
import com.anuj.model.Cart;
import com.anuj.model.CartItem;
import com.anuj.model.Product;
import com.anuj.model.User;
import com.anuj.repository.CartItemRepository;
import com.anuj.repository.CartRepository;
import com.anuj.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService {

	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	public CartServiceImplementation(CartRepository cartRepository,CartItemService cartItemService,ProductService productService) {
           this.cartItemService=cartItemService;
           this.cartRepository=cartRepository;
           this.productService=productService;
	}
	
	@Override
	public Cart createCart(User user) {
		Cart cart =new Cart();
		cart.setUser(user);
		return cartRepository.save(cart);
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
		
		Cart cart=cartRepository.findByUserId(userId);
		Product product=productService.findProductById(req.getProductId());
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, req.getSize(), userId);
		
		
	if(isPresent==null) {
		CartItem cartItem=new CartItem();
		cartItem.setProduct(product);
		cartItem.setCart(cart);
		cartItem.setQuantity(req.getQuentity());
		cartItem.setUserId(userId);
		
		int price=req.getQuentity()*product.getDiscountPercent();
		cartItem.setPrice(price);
		cartItem.setSize(req.getSize());
		
		CartItem createdCartItem=cartItemService.createCartItem(cartItem);
		cart.getCartItem().add(createdCartItem);
	}
		return "Item Add To Cart";
	}

	@Override
	public Cart findUserCart(Long userId) {
            Cart cart=cartRepository.findByUserId(userId);
            
            int totalPrice=0;
            int totalDiscountPrice=0;
            int totalItem=0;
            
            for(CartItem cartItem :cart.getCartItem()) {
            	totalPrice=totalPrice+cartItem.getPrice();
            	totalDiscountPrice=totalDiscountPrice+cartItem.getDiscountprice();
            	totalItem=totalItem+cartItem.getQuantity();
            }
            
            cart.setTotalDiscountPrice(totalDiscountPrice);
            cart.setTotalItem(totalItem);
            cart.setTotalPrice(totalPrice);
            cart.setDiscount(totalPrice-totalDiscountPrice);
            
		return cartRepository.save(cart);
	}

}
