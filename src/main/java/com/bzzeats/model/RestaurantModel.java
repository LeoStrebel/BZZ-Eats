package com.bzzeats.model;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant")
public class RestaurantModel {
    @Id
    @GeneratedValue
    @Column(name = "restaurantid", nullable = false)
    private Long restaurantId;

    @Column(name = "restaurantname")
    private String restaurantName;

    public RestaurantModel(Long restaurantId, String restaurantName) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
    }

    public RestaurantModel() {
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}
