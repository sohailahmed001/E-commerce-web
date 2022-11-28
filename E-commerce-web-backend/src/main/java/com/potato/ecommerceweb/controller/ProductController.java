package com.potato.ecommerceweb.controller;

import com.potato.ecommerceweb.model.ImageModel;
import com.potato.ecommerceweb.model.Product;
import com.potato.ecommerceweb.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/addNewProduct"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(
            @RequestPart("product") Product product,
            @RequestPart("imageFile")MultipartFile[] files) {
        try {
            Set<ImageModel> images = uploadImage(files);
            product.setProductImages(images);
            return productService.addNewProduct(product);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return null;
        }
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for(MultipartFile file: multipartFiles) {
            ImageModel imageModel = new ImageModel(file.getOriginalFilename(), file.getContentType(),file.getBytes());
            imageModels.add(imageModel);
        }

        return imageModels;
    }

    @GetMapping({"/getAllProducts"})
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping({"/getProductById/{productId}"})
    public Product getProductById(@PathVariable("productId") Integer productId) {
        return productService.getProductById(productId);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping({"/deleteProduct/{productId}"})
    public void deleteProduct(@PathVariable("productId") Integer productId) {
        productService.deleteProduct(productId);
    }
}
