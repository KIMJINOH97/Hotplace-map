package com.hotplace.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/index")
    public String index() {
        return "index.html";
    }

    @GetMapping("")
    public String place(){
        return "place.html";
    }
}