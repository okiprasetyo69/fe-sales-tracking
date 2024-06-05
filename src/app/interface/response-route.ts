// Created by supan adit pratama<supan.aditp@xenos.co.id>

import * as MapPolyline from 'decode-google-map-polyline';
import { GenerateRoute } from '@Model/response-generate-route';
import { DestinationOrder } from '@Model/response-destionation-order';

export interface RouteParent {
  geocoded_waypoints: GeocodedWayPoint[];
  routes: Route[];
  status: string;
}

export interface Route {
  bounds: Bounds;
  copyrights: string;
  legs: Leg[];
  overview_polyline: Polyline;
  summary: string;
  warnings: any[];
  waypoint_order: number[];
}

export interface GeocodedWayPoint {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

export interface Bounds {
  northeast: GeoPosition;
  southwest: GeoPosition;
}

export interface GeoPosition {
  lat: number;
  lng: number;
}

export class CreateGeoPosition implements GeoPosition {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}

export interface Polyline {
  points: string;
}


export interface Leg {
  distance: Distance;
  duration: Distance;
  end_address: string;
  end_location: GeoPosition;
  start_address: string;
  start_location: GeoPosition;
  steps: Step[];
  traffic_speed_entry: any[];
  via_waypoint: any[];
}

export interface Distance {
  text: string;
  value: number;
}

export interface Step {
  distance: Distance;
  duration: Distance;
  end_location: GeoPosition;
  html_instructions: string;
  polyline: Polyline;
  start_location: GeoPosition;
  travel_mode: string;
}


// Fungsi dibawah hanya fungsi-fungsi yang digunakan untuk parsing menjadi interface


/**
 * Fungsi yang digunakan untuk membuat array GeoPosition[] dari class RouteParet
 * @param routeParent adalah parameter yang berbentuk RouteParent
 * @return GeoPosition berupa array GeoPosition[]
 */
export function fromRouteParent(routeParent: RouteParent): GeoPosition[] {
  let geoPosition: GeoPosition[] = [];
  if (routeParent != null) {
    if (typeof routeParent.routes.length != 'undefined') {
      if (routeParent.routes.length != 0) {
        geoPosition = MapPolyline(routeParent.routes[0].overview_polyline.points)
      }
    }
  }
  return geoPosition;
}

/**
 * Fungsi yang digunakan untuk membuat array GeoPosition[] dari class Destination Order berupa List
 * @param destinationOrder adalah parameter yang berbentuk Destination Order
 * @return GeoPosition berupa array GeoPosition[]
 */
export function fromDestinationOrder(destinationOrder: DestinationOrder[]): GeoPosition[] {
  let geoPosition: GeoPosition[] = [];
  if (destinationOrder != null) {
    let x: DestinationOrder;
    for (x of destinationOrder) {
      const lat: number = +x.lat;
      const lng: number = +x.lng;
      geoPosition.push(new CreateGeoPosition(lat, lng));
    }
  }
  return geoPosition;
}


/**
 * Fungsi yang digunakan untuk membuat array GeoPosition[] dari class GenerateRoute
 * @param generatedResult adalah parameter yang berbentuk GenerateRoute
 * @return GeoPosition berupa array GeoPosition[]
 */
export function fromGenerateRoute(generatedResult: GenerateRoute): GeoPosition[] {
  const routeParent: RouteParent = generatedResult.google_route;
  return fromRouteParent(routeParent);
}


/**
 * Fungsi yang digunakan untuk membuat array GeoPosition[] dari class GenerateRoute berdasarkan Destination Order
 * @param generatedResult adalah parameter yang berbentuk GenerateRoute
 * @return GeoPosition berupa array GeoPosition[]
 */
export function fromGenerateRouteByDestinationOrder(generatedResult: GenerateRoute): GeoPosition[] {
  const destinationOrders: DestinationOrder[] = generatedResult.destination_order;
  return fromDestinationOrder(destinationOrders);
}
