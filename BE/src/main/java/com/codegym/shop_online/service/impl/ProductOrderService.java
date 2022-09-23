package com.codegym.shop_online.service.impl;

import com.codegym.shop_online.dto.ErrorDto;
import com.codegym.shop_online.model.Customer;
import com.codegym.shop_online.model.ProductOrder;
import com.codegym.shop_online.repository.IProductOrderRepository;
import com.codegym.shop_online.service.IProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOrderService implements IProductOrderService {

    @Autowired
    private IProductOrderRepository iProductOrderRepository;

    @Override
    public ErrorDto saveOrder(ProductOrder productOrder) {
        ErrorDto errorDto = new ErrorDto();
        productOrder.setDeleteStatus(false);
        ProductOrder po = this.iProductOrderRepository.findProductOrderListByCustomerAndProduct(productOrder);
        if (po == null) {
            if (productOrder.getQuantity() > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                this.iProductOrderRepository.save(productOrder);
            }
        } else {
            if ((po.getQuantity() + productOrder.getQuantity()) > productOrder.getProduct().getQuantity()) {
                errorDto.setMessage("quantity");
                errorDto.setProductOrder(po);
                return errorDto;
            } else {
                po.setQuantity(productOrder.getQuantity() + po.getQuantity());
                this.iProductOrderRepository.save(po);
            }
        }
        return errorDto;
    }

    @Override
    public List<ProductOrder> getProductInCardByCustomer(Customer customer) {
        return this.iProductOrderRepository.getProductInCardByCustomer(customer);
    }

    @Override
    public Boolean minusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() > 1) {
            productOrder.setQuantity(productOrder.getQuantity() - 1);
            this.iProductOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean plusQuantity(ProductOrder productOrder) {
        if (productOrder.getQuantity() < productOrder.getProduct().getQuantity()) {
            productOrder.setQuantity(productOrder.getQuantity() + 1);
            this.iProductOrderRepository.save(productOrder);
            return true;
        }
        return false;
    }

    @Override
    public Boolean findProductOrder(ProductOrder productOrder) {
        ProductOrder po = this.iProductOrderRepository.findById(productOrder.getId()).orElse(null);
        if (po != null) {
            this.iProductOrderRepository.delete(productOrder);
            return true;
        }
        return false;
    }

}
