package com.anuj.request;

public class AddItemRequest {

	private Long productId;
	private String size;
	private Integer quentity;
	private Integer price;
	
	public AddItemRequest() {
		// TODO Auto-generated constructor stub
	}
	
	

	public AddItemRequest(Long productId, String size, Integer quentity, Integer price) {
		super();
		this.productId = productId;
		this.size = size;
		this.quentity = quentity;
		this.price = price;
	}



	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
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
	
	
}
