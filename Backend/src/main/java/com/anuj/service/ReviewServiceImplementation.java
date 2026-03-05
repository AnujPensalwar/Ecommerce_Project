package com.anuj.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.anuj.exception.ProductException;
import com.anuj.model.Product;
import com.anuj.model.Review;
import com.anuj.model.User;
import com.anuj.repository.ProductRepository;
import com.anuj.repository.ReviewRepository;
import com.anuj.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService {
	
	

	private ReviewRepository reviewRepository;
	private ProductService productService;
	private ProductRepository productRepository;
	
	public ReviewServiceImplementation(ReviewRepository reviewRepository,ProductService productService) {
		this.productService=productService;
		this.reviewRepository=reviewRepository;
	}
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		
		System.out.println("ProductId received: " + req.getProductId());
		
		Product product=productService.findProductById(req.getProductId());
		
		Review review=new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		
		return reviewRepository.getAllProductsReview(productId);
	}

	
}
