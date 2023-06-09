package com.bzzeats.model;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class EssenModel {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "restaurantid", nullable = false)
    private int restaurantid;

    @Column(name = "menuname")
    private String menuname;

    @Column(name = "menudescription")
    private String menudescription;

    @Column(name = "price")
    private double price;

    public EssenModel(int id, int restaurantid, String menuname, String menudescription, double price) {
        this.id = id;
        this.restaurantid = restaurantid;
        this.menuname = menuname;
        this.menudescription = menudescription;
        this.price = price;
    }

    public int getRestaurantid() {
        return restaurantid;
    }

    public void setRestaurantid(int restaurantid) {
        this.restaurantid = restaurantid;
    }

    public EssenModel() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMenuname() {
        return menuname;
    }

    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    public String getMenudescription() {
        return menudescription;
    }

    public void setMenudescription(String menudescription) {
        this.menudescription = menudescription;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
