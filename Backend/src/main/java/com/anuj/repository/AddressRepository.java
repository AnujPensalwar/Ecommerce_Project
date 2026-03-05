package com.anuj.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anuj.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
