package com.hotplace.api.service;

public class CoordinateUtil {
    public static double EARTH_RADIUS = 6371;
    public static double RADIAN = Math.PI / 180;

    public static double ONE_KILOMETER_LATITUDE = 0.01126;
    public static double ONE_KILOMETER_LONGITUDE = 0.00899;

    public static double calculateTwoCoordinate(Double firstLat, Double firstLong, Double secondLat, Double secondLong){
        double deltaLat = Math.abs(firstLat - secondLat) * RADIAN;
        double deltaLong = Math.abs(firstLong - secondLong) * RADIAN;

        double sinDeltaLat = Math.sin(deltaLat / 2);
        double sinDeltaLong = Math.sin(deltaLong / 2);

        double squareRoot = Math.sqrt(Math.pow(sinDeltaLat, 2) +
                Math.cos(firstLat * RADIAN) * Math.cos(secondLat * RADIAN) * Math.pow(sinDeltaLong, 2));

        return 2 * EARTH_RADIUS * Math.asin(squareRoot);

    }
}
