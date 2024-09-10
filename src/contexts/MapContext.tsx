"use client";

import mapboxgl from "mapbox-gl";
import { createContext, useEffect, useState } from "react";

const MapContext = createContext<{
  map?: mapboxgl.Map;
}>({});

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2t5LTIwMjQiLCJhIjoiY2x3eG5lcmZpMWNpNzJucjFoN2dwYnFiMSJ9.4IEOvqX3dGRZpyHPx-MD9g";

function MapProvider({
  container = "map",
  children,
  initialZoom = 16,
  mapAddedCallback,
}: {
  container?: string;
  children: React.ReactNode;
  initialZoom?: number;
  mapAddedCallback?: (map: mapboxgl.Map) => void;
}) {
  const [map, setMap] = useState<mapboxgl.Map>();

  useEffect(() => {
    if (map) return;
    const mapbox = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12", // Estilo do mapa
      center: [13.2317184, -8.830976], // Posição inicial [longitude, latitude]
      zoom: initialZoom, // Zoom inicial
      minZoom: 1,
      //   bounds: new mapboxgl.LngLatBounds([4, 6, 6, 4]),
    });

    const navControl = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });

    mapbox.addControl(navControl, "top-right");

    mapAddedCallback && mapAddedCallback(mapbox);
    setMap(mapbox);
  }, [map]);

  // useEffect(() => {
  //   if (!map) return;

  //   const myLocation = new mapboxgl.GeolocateControl({
  //     // visualizePitch: true,
  //     showUserHeading: true,
  //     trackUserLocation: true,
  //     showAccuracyCircle: true,
  //     showUserLocation: true,
  //   });

  //   map.addControl(myLocation, "top-right");
  // }, [map]);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
}

export default MapContext;
export { MapProvider };
