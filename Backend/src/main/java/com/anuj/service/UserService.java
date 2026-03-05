package com.anuj.service;

import java.util.List;

import com.anuj.exception.UserException;
import com.anuj.model.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
		
	public List<User> getAllUsers() throws UserException;
	
	public User FindUserProfileByJwt(String jwt) throws UserException;

}
