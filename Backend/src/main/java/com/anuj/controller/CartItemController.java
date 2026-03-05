package com.anuj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuj.exception.CartItemException;
import com.anuj.exception.UserException;
import com.anuj.model.CartItem;
import com.anuj.model.User;
import com.anuj.request.UpdateCartItemRequest;
import com.anuj.response.ApiResponse;
import com.anuj.service.CartItemService;
import com.anuj.service.UserService;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

	@Autowired
	 private  CartItemService cartItemService;
	
	@Autowired
	 private UserService userService;
	
	
	@PutMapping("/{cartItemId}")
	 public ResponseEntity<CartItem> updateCartItem(
	            @PathVariable Long cartItemId,
	            @RequestBody UpdateCartItemRequest req,
	            @RequestHeader("Authorization") String jwt)
	            throws CartItemException, UserException {

	        User user = userService.FindUserProfileByJwt(jwt);

	        CartItem cartItem = new CartItem();
	        cartItem.setQuantity(req.getQuantity());

	        CartItem updatedCartItem =
	                cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);

	        return new ResponseEntity<CartItem>(updatedCartItem, HttpStatus.OK);
	    }
	
	@DeleteMapping("/{cartItemId}")
	 public ResponseEntity<ApiResponse> deleteCartItem(
	            @PathVariable Long cartItemId,
	            @RequestHeader("Authorization") String jwt)
	            throws CartItemException, UserException {

	        User user = userService.FindUserProfileByJwt(jwt);

	        cartItemService.removeCartItem(user.getId(), cartItemId);

	        ApiResponse res = new ApiResponse();
	        res.setMessage("Item removed from cart");
	        res.setStatus(true);

	        return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	    }
	
	@GetMapping("/{cartItemId}")
	public ResponseEntity<CartItem> findCartItemById(
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt)
            throws CartItemException, UserException {

        userService.FindUserProfileByJwt(jwt);

        CartItem cartItem = cartItemService.findCartItemById(cartItemId);

        return new ResponseEntity<CartItem>(cartItem, HttpStatus.OK);
    }
	
	
	
	
}
