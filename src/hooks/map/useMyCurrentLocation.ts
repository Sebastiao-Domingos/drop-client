import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export function useMyCurrentLocation(
  map?: mapboxgl.Map,
  cb?: (lng: number, lat: number) => void,
  isCurrentLocationEnabled?: boolean
) {
  useEffect(() => {
    if (!map) return;

    map.on("load", () => {
      const myLocation = new mapboxgl.GeolocateControl({
        showUserHeading: true,
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
        // geolocation: navigator.geolocation,
      });

      if (cb && isCurrentLocationEnabled) {
        myLocation.on("geolocate", (event) => {
          const evt = event as any;
          cb(evt!.coords.longitude, evt.coords.latitude);
        });
        map.addControl(myLocation, "top-right");
      }
    });
  }, [map, cb]);
}
