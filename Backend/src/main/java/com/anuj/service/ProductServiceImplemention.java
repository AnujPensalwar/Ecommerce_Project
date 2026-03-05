package com.anuj.service;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.anuj.exception.ProductException;
import com.anuj.model.Category;
import com.anuj.model.Product;
import com.anuj.repository.CategoryRepository;
import com.anuj.repository.ProductRepository;
import com.anuj.repository.UserRepository;
import com.anuj.request.CreateProductRequest;

@Service
public class ProductServiceImplemention implements ProductService {

	private ProductRepository productRepository;
	private UserRepository userRepository;
	private CategoryRepository categoryRepository;
	
	public ProductServiceImplemention(ProductRepository productRepository,UserRepository userRepository,CategoryRepository categoryRepository) {
		this.categoryRepository=categoryRepository;
		this.productRepository=productRepository;
		this.userRepository=userRepository;
	}
	
	@Override
	public Product createProduct(CreateProductRequest req) {
		
		Category topLevel=categoryRepository.findByName(req.getTopLevelCategory());
		
		if(topLevel==null) {
			Category topLevelCategory=new Category();
			topLevelCategory.setName(req.getTopLevelCategory());
			topLevelCategory.setLevel(1);
			
			topLevel=categoryRepository.save(topLevelCategory);
		}
		
		Category secondLevel=categoryRepository.findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());
		
		if(secondLevel==null) {
			Category secondLevelCategory=new Category();
			secondLevelCategory.setName(req.getSecondLevelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);
			
			secondLevel=categoryRepository.save(secondLevelCategory);
			
		}
		
            Category thirdLevel=categoryRepository.findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());
		
		    if(thirdLevel==null) {
			Category thirdLevelCategory=new Category();
			thirdLevelCategory.setName(req.getThirdLevelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);
			
			thirdLevel=categoryRepository.save(thirdLevelCategory);
			
		}
		
		    Product product=new Product();
		    product.setTitle(req.getTitle());
		    product.setColor(req.getColor());
		    product.setDiscription(req.getDescription());
		    product.setDiscountPrice(req.getDiscountedPrice());
		    product.setDiscountPercent(req.getDiscountPercent());
		    product.setImageUrl(req.getImageUrl());
		    product.setBrand(req.getBrand());
		    product.setPrice(req.getPrice());
		    product.setSize(req.getSize());
		    product.setQuentity(req.getQuentity());
		    product.setCategory(thirdLevel);
		    product.setCreatedAt(LocalDateTime.now());
		
		    Product savedProduct=productRepository.save(product);
		
		return savedProduct;
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product=findProductById(productId);
		product.getSize().clear();
		productRepository.delete(product);
		return "Product deleted successfully";
	}

	@Override
	public Product updateProduct(Long productId, CreateProductRequest req) throws ProductException {
		  Product product = findProductById(productId);

		    

		    Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());

		    if(topLevel == null){
		        Category newTop = new Category();
		        newTop.setName(req.getTopLevelCategory());
		        newTop.setLevel(1);
		        topLevel = categoryRepository.save(newTop);
		    }

		    Category secondLevel = categoryRepository
		            .findByNameAndParent(req.getSecondLevelCategory(), topLevel.getName());

		    if(secondLevel == null){
		        Category newSecond = new Category();
		        newSecond.setName(req.getSecondLevelCategory());
		        newSecond.setParentCategory(topLevel);
		        newSecond.setLevel(2);
		        secondLevel = categoryRepository.save(newSecond);
		    }

		    Category thirdLevel = categoryRepository
		            .findByNameAndParent(req.getThirdLevelCategory(), secondLevel.getName());

		    if(thirdLevel == null){
		        Category newThird = new Category();
		        newThird.setName(req.getThirdLevelCategory());
		        newThird.setParentCategory(secondLevel);
		        newThird.setLevel(3);
		        thirdLevel = categoryRepository.save(newThird);
		    }

		    product.setTitle(req.getTitle());
		    product.setDiscription(req.getDescription());
		    product.setPrice(req.getPrice());
		    product.setDiscountPrice(req.getDiscountedPrice());
		    product.setDiscountPercent(req.getDiscountPercent());
		    product.setQuentity(req.getQuentity());
		    product.setBrand(req.getBrand());
		    product.setColor(req.getColor());
		    product.setImageUrl(req.getImageUrl());
		    product.setSize(req.getSize());
		    product.setCategory(thirdLevel);
		
		
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Long id) throws ProductException {
		
		Optional<Product>opt=productRepository.findById(id);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new ProductException("product not found with id-"+id);
		
	}

	@Override
	public List<Product> findProductByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Product> getAllProduct(String topLevel,
		    String secondLevel,
		    String thirdLevel, List<String> colors, List<String> sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
		System.out.println("CATEGORY RECEIVED = " +topLevel+""+secondLevel+""+thirdLevel );
		
		Pageable pageable=PageRequest.of(pageNumber, pageSize);
		
		List<Product>products=productRepository.filterProducts(topLevel, secondLevel,thirdLevel, minPrice, maxPrice, minDiscount, sort);
		
		if(colors != null && !colors.isEmpty()) {
			products=products.stream().filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
		}
			if(stock!=null) {
				if(stock.equals("in_stock")){
					products=products.stream().filter(p->p.getQuentity()>0).collect(Collectors.toList());
			}
				else if(stock.equals("out_of_stock")) {
					products=products.stream().filter(p->p.getQuentity()<1).collect(Collectors.toList());
				}
			}
			
		
		
		int startIndex=(int) pageable.getOffset();
	    int endIndex=Math.min(startIndex + pageable.getPageSize(),products.size());
	    
	    List<Product> pageContent=products.subList(startIndex, endIndex);
	    Page<Product>filteredProducts=new PageImpl<>(pageContent,pageable,products.size());
		return filteredProducts;
		}

	@Override
	public List<Product> findAllProduct() {
		
		return productRepository.findAll();
	}
	
	@Override
	public Product saveProduct(Product product){
	    return productRepository.save(product);
	}

}
