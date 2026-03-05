package com.anuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anuj.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	@Query("SELECT r From Review r where r.product.id=:productId")
	public List<Review>getAllProductsReview(@Param("productId")Long productId);
	
}
