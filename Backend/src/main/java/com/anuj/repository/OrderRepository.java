package com.anuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anuj.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

	@Query("SELECT o FROM orders o WHERE o.user.id = :userId")
	public List<Order> getUsersOrders(@Param("userId")Long userId);
}


//@Query("SELECT o FROM order o WHERE o.user.id=:userId AND (o.orderStatus= 'PLACED' OR o.orderStatus= 'CONFIRMED' OR o.orderStatus= 'SHIPPED' OR o.orderStatus= 'CONFIRMED' OR o.orderStatus= 'DELIVERED')