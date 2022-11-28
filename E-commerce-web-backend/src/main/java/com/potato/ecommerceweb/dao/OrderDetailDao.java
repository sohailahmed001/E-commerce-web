package com.potato.ecommerceweb.dao;

import com.potato.ecommerceweb.model.OrderDetail;
import org.springframework.data.repository.CrudRepository;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {
}
