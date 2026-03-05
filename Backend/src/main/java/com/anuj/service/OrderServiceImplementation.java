package com.anuj.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.anuj.exception.OrderException;
import com.anuj.model.Address;
import com.anuj.model.Cart;
import com.anuj.model.CartItem;
import com.anuj.model.Order;
import com.anuj.model.OrderItem;
import com.anuj.model.PaymentDetails;
import com.anuj.model.User;
import com.anuj.repository.AddressRepository;
import com.anuj.repository.CartRepository;
import com.anuj.repository.OrderItemRepository;
import com.anuj.repository.OrderRepository;
import com.anuj.repository.UserRepository;

@Service
public class OrderServiceImplementation implements OrderService {

	

	private OrderRepository orderRepository;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemService orderItemService;
	private OrderItemRepository orderItemRepository;
	private CartService cartService;
	
	public OrderServiceImplementation(OrderRepository orderRepository,OrderItemRepository orderItemRepository,UserRepository userRepository,OrderItemService orderItemService,CartService cartService,AddressRepository addressRepository) {
	
		this.addressRepository=addressRepository;
		this.orderItemRepository=orderItemRepository;
		this.orderItemService=orderItemService;
		this.orderRepository=orderRepository;
		this.userRepository=userRepository;
		this.cartService =cartService;
		
	}
	@Override
	public Order createOrder(User user, Address shippingAddress) {
		
		Address address;

		if (shippingAddress.getId() != null) {
            
            address = addressRepository
                    .findById(shippingAddress.getId())
                    .orElseThrow(() -> new RuntimeException("Address not found"));
        } else {
           
            shippingAddress.setUser(user);
            address = addressRepository.save(shippingAddress);
            user.getAddress().add(address);
            userRepository.save(user);
        }


			Cart cart=cartService.findUserCart(user.getId());
			List<OrderItem> orderitems=new ArrayList<>();

			for(CartItem item: cart.getCartItem()) {
			OrderItem orderitem=new OrderItem();

			orderitem.setPrice(item.getPrice());
			orderitem.setProduct(item.getProduct());
			orderitem.setQuentity(item.getQuantity());
			orderitem.setSize(item.getSize());
			orderitem.setUserId(item.getUserId());
			orderitem.setDiscountprice(item.getDiscountprice());
			
			OrderItem createdOrderItem=orderItemRepository.save(orderitem);
			
			orderitems.add(createdOrderItem);
			}
			
			Order createdOrder=new Order();
			createdOrder.setUser(user);
			createdOrder.setOrderItems(orderitems);
			createdOrder.setTotalPrice(cart.getTotalPrice());
			createdOrder.setDiscount(cart.getDiscount());
			createdOrder.setTotalItem(cart.getTotalItem());
			createdOrder.setTotalDiscountprice(cart.getTotalDiscountPrice());

			
			createdOrder.setShippingAddress(address);
			createdOrder.setOrderDate(LocalDateTime.now());
			createdOrder.setDeliveryDate(createdOrder.getOrderDate().plusDays(7));
			createdOrder.setOrderStatus("PENDING");
			
			PaymentDetails paymentDetails = new PaymentDetails();
			paymentDetails.setStatus("PENDING");
			createdOrder.setPaymentDetails(paymentDetails);
			
			createdOrder.setCreatedAt(LocalDateTime.now());
			
			Order savedOrder=orderRepository.save(createdOrder);
			
			for(OrderItem item:orderitems) {
				item.setOrder(savedOrder);
				orderItemRepository.save(item);
			}
			
		return savedOrder;
			}
	
	
	

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		
		Optional<Order> opt=orderRepository.findById(orderId);

		if(opt.isPresent()) {

		return opt.get();

		}

		throw new OrderException("order not exist with id "+orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		List<Order>orders=orderRepository.getUsersOrders(userId);
		return orders;
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus ("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		System.out.println("CONFIRM CALLED");
		return orderRepository.save(order);
		

	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus ("SHIPPED");
		System.out.println("SHIP CALLED");
		return orderRepository.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		
		Order order=findOrderById(orderId);
	    order.setOrderStatus ("DELIVERED");
	    System.out.println("DELIVER CALLED");

	return orderRepository.save(order);
	}

	@Override
	public Order cancledOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		System.out.println("CANCEL CALLED");

		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllorders() {
		
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		
		orderRepository.deleteById(orderId);;
		
	}

}
