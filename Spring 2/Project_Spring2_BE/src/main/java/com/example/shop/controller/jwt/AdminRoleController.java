package com.example.shop.controller.jwt;


import com.example.shop.service.CookieService;
import com.example.shop.service.jwt.JwtUserDetailsService;
import com.example.shop.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AdminRoleController {

    @Autowired
    private CookieService cookieService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @RequestMapping(value = "/role/admin", method = RequestMethod.POST)
    public ResponseEntity<Boolean> TestRequest(HttpServletRequest request) {
        final String requestTokenHeader = this.cookieService.cookie(request).get("Authorization").substring(7);

        UserDetails userDetails = this.jwtUserDetailsService
                .loadUserByUsername(this.jwtTokenUtil.getUsernameFromToken(requestTokenHeader));

        List<String> grantList = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        for (String grant: grantList) {
            if (grant.equals("ROLE_ADMIN")) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
}
