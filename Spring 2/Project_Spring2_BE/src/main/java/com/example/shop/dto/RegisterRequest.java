package com.example.shop.dto;


import com.example.shop.model.account.AppUser;
import lombok.Data;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.Pattern;
import java.util.List;
@Data
public class RegisterRequest implements Validator {
    @Pattern(regexp = "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")
    private String username;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
    private String password;
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")
    private String confirmPassword;
    private List<AppUser> appUserList;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public List<AppUser> getAppUserList() {
        return appUserList;
    }

    public void setAppUserList(List<AppUser> appUserList) {
        this.appUserList = appUserList;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        com.example.shop.dto.RegisterRequest registerRequest = (com.example.shop.dto.RegisterRequest) target;
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            errors.rejectValue("password","","passwordnotsame");
        }
        for (AppUser appUser: this.appUserList) {
            if (appUser.getUserName().equals(registerRequest.getUsername())) {
                errors.rejectValue("username", "", "usernameexists");
            }
        }
    }
}
