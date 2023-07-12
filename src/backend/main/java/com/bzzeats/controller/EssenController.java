package com.bzzeats.controller;

import com.bzzeats.model.EssenModel;
import com.bzzeats.repository.EssenRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class EssenController {

    private final EssenRepository essenRepository;

    public EssenController(EssenRepository essenRepository) {
        this.essenRepository = essenRepository;
    }

    @PostMapping("/menu")
    @ResponseStatus(HttpStatus.CREATED)
    public EssenModel create(@RequestBody EssenModel restaurant) {
        return essenRepository.save(restaurant);
    }

    @GetMapping("/getMenus")
    public List<EssenModel> getRestaurants(){
        List<EssenModel> restaurants = essenRepository.findAll();
        return restaurants;
    }

}
