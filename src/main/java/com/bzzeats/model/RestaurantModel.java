package com.bzzeats.model;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant")
public class RestaurantModel {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "restaurantname")
    private String name;

    @Column(name = "score")
    private double score;

    @Column(name = "ratings")
    private int ratings;

    @Column(name = "category")
    private String category;

    @Column(name = "full_address")
    private String fullAddress;

    public RestaurantModel(int id, String name, double score, int ratings, String category, String fullAddress) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.ratings = ratings;
        this.category = category;
        this.fullAddress = fullAddress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public int getRatings() {
        return ratings;
    }

    public void setRatings(int ratings) {
        this.ratings = ratings;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public RestaurantModel() {

    }


}
