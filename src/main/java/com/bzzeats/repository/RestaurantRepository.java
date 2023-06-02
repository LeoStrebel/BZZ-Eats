package com.bzzeats.repository;

import com.bzzeats.model.RestaurantModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<RestaurantModel, Long> {

    public List<RestaurantModel> findAll();

}
