package com.potato.ecommerceweb.service;

import com.potato.ecommerceweb.dao.ProductDao;
import com.potato.ecommerceweb.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }
}
