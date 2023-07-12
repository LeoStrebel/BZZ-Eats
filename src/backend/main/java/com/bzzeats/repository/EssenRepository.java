package com.bzzeats.repository;

import com.bzzeats.model.EssenModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssenRepository extends JpaRepository<EssenModel, Long> {

    public List<EssenModel> findAll();

}
