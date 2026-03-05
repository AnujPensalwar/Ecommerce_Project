package com.anuj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anuj.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT p FROM Product p " +
			"WHERE (:topLevel IS NULL OR LOWER(p.category.parentCategory.parentCategory.name) = LOWER(:topLevel)) " +
		       "AND (:secondLevel IS NULL OR LOWER(p.category.parentCategory.name) = LOWER(:secondLevel)) " +
		       "AND (:thirdLevel IS NULL OR LOWER(p.category.name) = LOWER(:thirdLevel)) " +
		       "AND ((:minPrice IS NULL AND :maxPrice IS NULL) " +
		       "OR (p.discountPrice BETWEEN :minPrice AND :maxPrice)) " +
		       "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount) " +
		       "ORDER BY " +
		       "CASE WHEN :sort = 'price_low' THEN p.discountPrice END ASC, " +
		       "CASE WHEN :sort = 'price_high' THEN p.discountPrice END DESC")

	public List<Product> filterProducts(@Param("topLevel") String topLevel,
			@Param("secondLevel") String secondLevel,
			@Param("thirdLevel") String thirdLevel,
			@Param("minPrice") Integer minPrice,
			@Param("maxPrice") Integer maxPrice,
			@Param("minDiscount") Integer minDiscount,
			@Param("sort") String sort);
	
}
