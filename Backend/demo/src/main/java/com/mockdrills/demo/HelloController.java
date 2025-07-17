package com.mockdrills.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

// Add to the class:
@CrossOrigin(origins = "http://localhost:3000")


@RestController
public class HelloController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello From JAVA SpringBoot !!!";
    }
}
