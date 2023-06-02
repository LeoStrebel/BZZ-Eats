package com.bzzeats.controller;

import com.bzzeats.model.RestaurantModel;
import com.bzzeats.repository.RestaurantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @PostMapping("/order")
    @ResponseStatus(HttpStatus.CREATED)
    public RestaurantModel create(@RequestBody RestaurantModel restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @GetMapping("/getOrders")
    public List<RestaurantModel> getRestaurants(){
        return restaurantRepository.findAll();
    }

}
