package com.anuj.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@JsonIgnore
	@ManyToOne
	private Order order;
	
	@ManyToOne
	private Product product;
	
	private String size;
	
	private int quentity;
	
	private Integer price;
	
	private Integer discountprice;
	
	private Long userId;
	
	private LocalDateTime deliveryDate;
	
	
	public OrderItem() {
		// TODO Auto-generated constructor stub
	}


	public OrderItem(Long id, Order order, Product product, String size, int quentity, Integer price,
			Integer discountprice, Long userId, LocalDateTime deliveryDate) {
		super();
		this.id = id;
		this.order = order;
		this.product = product;
		this.size = size;
		this.quentity = quentity;
		this.price = price;
		this.discountprice = discountprice;
		this.userId = userId;
		this.deliveryDate = deliveryDate;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Order getOrder() {
		return order;
	}


	public void setOrder(Order order) {
		this.order = order;
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}


	public String getSize() {
		return size;
	}


	public void setSize(String size) {
		this.size = size;
	}


	public int getQuentity() {
		return quentity;
	}


	public void setQuentity(int quentity) {
		this.quentity = quentity;
	}


	public Integer getPrice() {
		return price;
	}


	public void setPrice(Integer price) {
		this.price = price;
	}


	public Integer getDiscountprice() {
		return discountprice;
	}


	public void setDiscountprice(Integer discountprice) {
		this.discountprice = discountprice;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public LocalDateTime getDeliveryDate() {
		return deliveryDate;
	}


	public void setDeliveryDate(LocalDateTime deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
	
}
