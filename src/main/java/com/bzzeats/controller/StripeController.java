package com.bzzeats.controller;

import com.bzzeats.model.CheckoutItem;
import com.bzzeats.model.EssenModel;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class StripeController {
    static {
        Stripe.apiKey = "sk_test_51NObT1AVbesgGByCjs193kA8ZHK761DZpv1Y42yAhe3LhtsrsiM8A0tXXQtkfen4TzStCntZyTelZLGxsh7hrFyT00UHf3cvWa"; // Replace with your secret key
    }

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody CheckoutItem[] items) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        String baseUrl = "http://localhost:3000";

        for (CheckoutItem item : items) {
            lineItems.add(
                    SessionCreateParams.LineItem.builder()
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("usd")
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(item.getName())
                                                            .build())
                                            .setUnitAmount(2000L)
                                            .build())
                            .setQuantity((long) item.getQuantity())
                            .build());
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(baseUrl + "/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(baseUrl + "/cancel")
                .setShippingAddressCollection(SessionCreateParams.ShippingAddressCollection.builder().addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.CH).build())
                .build();

        Session session = Session.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("id", session.getId());
        return responseData;
    }
}
