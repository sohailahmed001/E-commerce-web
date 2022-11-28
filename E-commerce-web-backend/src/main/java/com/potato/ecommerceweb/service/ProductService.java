package com.potato.ecommerceweb.service;

import com.potato.ecommerceweb.dao.ProductDao;
import com.potato.ecommerceweb.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getAllProducts() {
        return (List<Product>)  productDao.findAll();
    }

    public void deleteProduct(Integer productId) {
        productDao.deleteById(productId);
    }

    public Product getProductById(Integer productId) {
        return productDao.findById(productId).get();
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId) {
        if(isSingleProductCheckout) {
            List<Product> productList = new ArrayList<>();
            productList.add(productDao.findById(productId).get());
            return productList;
        }else {
            return new ArrayList<>();
        }
    }
}
