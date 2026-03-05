package com.anuj.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.anuj.config.JwtProvider;
import com.anuj.exception.UserException;
import com.anuj.model.User;
import com.anuj.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	private UserRepository userRepository;
	private JwtProvider jwtProvider;
	
	public UserServiceImplementation(UserRepository userRepository,JwtProvider jwtProvider) {
		this.jwtProvider=jwtProvider;
		this.userRepository=userRepository;
	}
	
	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User>user=userRepository.findById(userId);
		if(user.isPresent()) {
			return user.get();		
			}
		throw new UserException("user not found with id:"+userId);
	}

	@Override
	public User FindUserProfileByJwt(String jwt) throws UserException {
		String email=jwtProvider.getEmailFromToken(jwt);
		
		User user=userRepository.findByEmail(email);
		
		if(user==null) {
			throw new UserException("user not found with email:"+email);
		}
		return user;
	}
	
	
	@Override
	public List<User> getAllUsers() {
	    return userRepository.findAll();
	}


}
