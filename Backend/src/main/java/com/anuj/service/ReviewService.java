package com.anuj.service;

import java.util.List;

import com.anuj.exception.ProductException;
import com.anuj.model.Review;
import com.anuj.model.User;
import com.anuj.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	public List<Review>getAllReview(Long productId); 
}
