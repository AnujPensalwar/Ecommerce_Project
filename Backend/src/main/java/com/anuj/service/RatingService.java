package com.anuj.service;

import java.util.List;

import com.anuj.exception.ProductException;
import com.anuj.model.Rating;
import com.anuj.model.User;
import com.anuj.request.RatingRequest;

public interface RatingService {

	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating>getProductRating(Long productId);
	
}
