import React, { useRef, useEffect, useState } from "react";
import { Container, LoadingIcon } from "../../components";
import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl";
import axios from "axios";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "./index.css";

import UVIndexBar from "./UVIndexBar";
import { mapKey } from "../../config";
mapboxgl.accessToken = mapKey || "";

export const UVI = (props: any) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom] = useState(15);
  const [address, setAddress] = useState("");
  const [currentUVI, setCurrentUVI] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState({
    clothingAdvice: "",
    maxUv: "",
    minUv: "",
    reapplySunscreen: "",
    sunscreen: "",
    sunscreenAmount: "",
    uvCategory: "",
  });

  var userLocation: any = [];

  useEffect(() => {
    if (map.current) return; // initialize map only once

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation = [position.coords.longitude, position.coords.latitude];
          localStorage.setItem("lat", userLocation[1]);
          localStorage.setItem("lng", userLocation[0]);
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: userLocation,
            zoom: zoom,
          });

          const nav = new mapboxgl.NavigationControl({
            visualizePitch: true,
            showCompass: true,
            showZoom: true,
          });

          map.current.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true,
              },
              trackUserLocation: true,
              showUserHeading: true,
            })
          );

          map.current.addControl(nav, "top-right");

          new mapboxgl.Marker().setLngLat(userLocation).addTo(map.current);

          setLoading(false);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    }
  });

  function navigateToAddress() {
    // Use the Mapbox Geocoding API to convert the address to coordinates
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=` + mapboxgl.accessToken
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          // Extract the longitude and latitude from the geocoding response
          const coordinates = data.features[0].geometry.coordinates;
          setLat(coordinates[1]);
          setLng(coordinates[0]);

          localStorage.setItem("lat", coordinates[1]);
          localStorage.setItem("lng", coordinates[0]);
          map.current.setCenter(coordinates);

          // Add a marker at the coordinates
          new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);
        } else {
          console.error("Geocoding failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    if (lat && lng) {
      axios
        .get(`http://localhost:8001/api/uvi?lat=${lat}&lng=${lng}`)
        .then((result: any) => {
          setCurrentUVI(result.data.data.current.uvi);
          setCurrentTemp(result.data.data.current.temp);

          console.log(
            "result.data.data.recommendation",
            result.data.data.recommendation
          );
          setRecommendation(result.data.data.recommendation);
        });
    }
  }, [lat, lng]);

  return (
    <div>
      <h5 className="mb-[5px]">Pleas input the address</h5>
      <div className="flex flex-row mb-10 items-center">
        <input
          type="text"
          placeholder="Input address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="w-[50%] border-[1px] border-black rounded-md p-2 mr-10"
        />
        <button
          className="w-[100px] h-[30px] text-center flex align-middle justify-center"
          onClick={navigateToAddress}
        >
          Search
        </button>
      </div>

      <div ref={mapContainer} className="min-h-[300px] h-[50%] w-[100%]" />

      {loading && (
        <div className="absolute top-[35%] left-[50%] flex justify-center">
          <LoadingIcon />
        </div>
      )}

      {/* suggestion */}
      <div className="mt-10 mb-10 min-h-[100px]">
        {/* showing the ux index */}
        {<UVIndexBar currentUVI={currentUVI} temp={currentTemp} />}
      </div>
      <div className="mt-10">
        <AwesomeSlider animation="cubeAnimation" style={{ height: 400 }}>
          <div className="h-[100%] p-[20px] w-[100%] flex flex-col items-center">
            <h3 className="text-white">Sunscreen & Protection</h3>

            <div className="flex flex-row w-[75%] mt-[40px]">
              <h5 className="text-white flex-1 font-extrabold">
                What level of sunscreen
              </h5>
              <h5 className="text-white flex-1 text-center">
                {recommendation.sunscreen}
              </h5>
            </div>

            <div className="flex flex-row w-[75%] mt-[40px]">
              <h5 className="text-white flex-1 font-extrabold">
                How much you should apply
              </h5>
              <h5 className="text-white flex-1 text-center">
                {recommendation.sunscreenAmount}
              </h5>
            </div>

            <div className="flex flex-row w-[75%] mt-[40px]">
              <h5 className="text-white flex-1 font-extrabold">
                When do you reapply your sunscreen
              </h5>
              <h5 className="text-white flex-1 text-center">
                {recommendation.reapplySunscreen}
              </h5>
            </div>
          </div>

          <div className="h-[100%] p-[20px] w-[100%] flex flex-col items-center">
            <h3 className="text-white">Clothing</h3>

            <div className="flex flex-row w-[75%] mt-[40px]">
              <h5 className="text-white flex-1 font-extrabold">
                What clothe your should wear
              </h5>
              <div className="text-white flex-1 text-center">
                {recommendation.clothingAdvice}
              </div>
            </div>
          </div>
        </AwesomeSlider>
      </div>

      <div className="h-[20px] w-[100%] mt-10" />
    </div>
  );
};
