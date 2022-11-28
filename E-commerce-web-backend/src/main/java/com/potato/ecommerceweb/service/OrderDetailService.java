package com.potato.ecommerceweb.service;

import com.potato.ecommerceweb.configuration.JwtRequestFilter;
import com.potato.ecommerceweb.dao.OrderDetailDao;
import com.potato.ecommerceweb.dao.ProductDao;
import com.potato.ecommerceweb.dao.UserDao;
import com.potato.ecommerceweb.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {

    private static final String ORDER_PLACED = "Placed";

    @Autowired
    private OrderDetailDao orderDetailDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    public void placeOrder(OrderInput orderInput) {
        List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();

        for(OrderProductQuantity order: productQuantityList) {
            Product product = productDao.findById(order.getProductId()).get();
            String username = JwtRequestFilter.CURRENT_USER;

            User user = userDao.findById(username).get();

            OrderDetail orderDetail = new OrderDetail(
                orderInput.getFullName(),
                orderInput.getFullAddress(),
                orderInput.getContactNumber(),
                orderInput.getAltContactNumber(),
                ORDER_PLACED,
                product.getProductDiscountedPrice() * order.getQuantity(),
                product,
                user
            );

            orderDetailDao.save(orderDetail);
        }
    }
}
