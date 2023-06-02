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

    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED)
    public RestaurantModel create(@RequestBody RestaurantModel restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @GetMapping("/getRestaurants")
    public List<RestaurantModel> getRestaurants(){
        List<RestaurantModel> restaurants = restaurantRepository.findAll();
        System.out.println(restaurants.get(1).getId());
        return restaurants;
    }

}
