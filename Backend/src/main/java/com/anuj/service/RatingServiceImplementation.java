package com.anuj.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.anuj.exception.ProductException;
import com.anuj.model.Product;
import com.anuj.model.Rating;
import com.anuj.model.User;
import com.anuj.repository.ProductRepository;
import com.anuj.repository.RatingRepository;
import com.anuj.request.RatingRequest;

@Service
public class RatingServiceImplementation implements RatingService {

    private RatingRepository ratingRepository;
    private ProductService productService;
    private ProductRepository productRepository;

    public RatingServiceImplementation(
            RatingRepository ratingRepository,
            ProductService productService,
            ProductRepository productRepository) {

        this.productService = productService;
        this.ratingRepository = ratingRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {

        Product product = productService.findProductById(req.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        ratingRepository.save(rating);

        // 🔥 Recalculate average rating
        List<Rating> ratings = ratingRepository.getAllProductsRating(product.getId());

        double total = 0;
        for(Rating r : ratings){
            total += r.getRating();
        }

        double average = ratings.size() > 0 ? total / ratings.size() : 0;

        product.setAverageRating(average);
        product.setNumRating(ratings.size());

        productService.saveProduct(product);   // make sure this method exists

        return rating;
    }
    
    @Override
    public List<Rating> getProductRating(Long productId) {
        return ratingRepository.getAllProductsRating(productId);
    }
}