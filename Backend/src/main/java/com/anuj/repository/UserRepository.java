package com.anuj.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuj.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	
	public User findByEmail(String email);
}
