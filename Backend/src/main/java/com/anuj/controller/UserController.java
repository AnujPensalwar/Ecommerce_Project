package com.anuj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anuj.exception.UserException;
import com.anuj.model.Address;
import com.anuj.model.User;
import com.anuj.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization" )String jwt)throws UserException{

	User user=userService.FindUserProfileByJwt(jwt);

	return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	
	}
	
	@GetMapping("/addresses")
	public ResponseEntity<List<Address>> getUserAddresses(
	        @RequestHeader("Authorization") String jwt) throws UserException {

	    User user = userService.FindUserProfileByJwt(jwt);

	    return new ResponseEntity<>(user.getAddress(), HttpStatus.OK);
	}

}
