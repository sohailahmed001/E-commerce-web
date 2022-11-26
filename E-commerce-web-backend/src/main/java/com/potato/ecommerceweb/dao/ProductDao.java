package com.potato.ecommerceweb.dao;

import com.potato.ecommerceweb.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer> {

}
