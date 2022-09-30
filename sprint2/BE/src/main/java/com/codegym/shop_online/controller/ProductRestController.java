package com.codegym.shop_online.controller;

import com.codegym.shop_online.dto.ErrorDto;
import com.codegym.shop_online.dto.ProductDto;
import com.codegym.shop_online.model.Product;
import com.codegym.shop_online.service.IProductService;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class ProductRestController {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IProductService iProductService;

    @GetMapping(value = "/new")
    public ResponseEntity<List<Product>> getNewProducts() {
        List<Product> productList = iProductService.getNewProducts();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/list/{page}")
    public ResponseEntity<Page<Product>> findAll(@PathVariable("page") Integer page) {
        Page<Product> productPage = iProductService.findAll(PageRequest.of(page,6));
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/home/list")
    public ResponseEntity<List<Product>> findProduct() {
        List<Product> productPage = iProductService.getProducts();
        if (productPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<Page<Product>> findAllByName(@PathVariable("page") Integer page,
                                                       @RequestParam("name") String name) {
        Sort sort = Sort.by("release_time").descending();
        Page<Product> productPage = iProductService.findAllByName(PageRequest.of(page, 4, sort), name);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/price/{page}")
    public ResponseEntity<Page<Product>> findAllByPrice(@PathVariable("page") Integer page,
                                                        @RequestParam("price") Integer price) {
        Sort sort = Sort.by("release_time").descending();
        Page<Product> productPage = iProductService.findAllByPrice(PageRequest.of(page, 4, sort), price);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> findAllByCategory(@PageableDefault(value = 8) Pageable pageable,
                                                           @RequestParam("id") Integer id) {
        Page<Product> productPage = iProductService.findAllByCategory(pageable, id);
        if (productPage.hasContent()) {
            return new ResponseEntity<>(productPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = iProductService.findById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<Product> editProduct( @RequestBody Product productDto){
        iProductService.save(productDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        Boolean check = this.iProductService.deleteProduct(id);
        if (check) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMessage("idnotfound");
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
