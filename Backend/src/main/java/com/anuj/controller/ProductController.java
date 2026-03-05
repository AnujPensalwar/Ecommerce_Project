package com.anuj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anuj.exception.ProductException;
import com.anuj.model.Product;
import com.anuj.request.CreateProductRequest;
import com.anuj.service.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("/products")
	public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String topLevel,
	        @RequestParam String secondLevel,
	        @RequestParam String thirdLevel, 
			@RequestParam List<String>color, 
			@RequestParam List<String> size, 
			@RequestParam Integer minPrice, 
			@RequestParam Integer maxPrice, 
			@RequestParam Integer minDiscount, 
			@RequestParam String sort, 
			@RequestParam String stock, 
			@RequestParam Integer pageNumber, 
			@RequestParam Integer pageSize){

		Page<Product>res=productService.getAllProduct(
				topLevel,secondLevel,thirdLevel, color, size, minPrice, maxPrice, 
        minDiscount, sort, stock, pageNumber,pageSize);

		System.out.println("complete products");

		return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
	}
	
	
	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException{

			Product product=productService.findProductById(productId);

			return new ResponseEntity<Product>(product, HttpStatus.ACCEPTED);
			
	}
	
	@PutMapping("/admin/products/{productId}")
	public ResponseEntity<Product> updateProductHandler(
	        @PathVariable Long productId,
	        @RequestBody CreateProductRequest req
	) throws ProductException {

	    Product updatedProduct = productService.updateProduct(productId, req);
	    return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	}
	
	
	@GetMapping("/products/all")
	public ResponseEntity<List<Product>> getAllProducts(){

	    List<Product> products = productService.findAllProduct();

	    return new ResponseEntity<>(products, HttpStatus.OK);
	}
}
