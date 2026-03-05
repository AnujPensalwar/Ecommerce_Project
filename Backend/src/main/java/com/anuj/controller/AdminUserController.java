package com.anuj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.anuj.exception.UserException;
import com.anuj.model.User;
import com.anuj.service.UserService;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() throws UserException {

        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
