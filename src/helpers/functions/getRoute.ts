import { logger } from "@/Logger";
import mapboxgl from "mapbox-gl";
import { toast } from "react-toastify";

export async function getRoute(
  map: mapboxgl.Map,
  start: [number, number],
  end: [number, number]
) {
  try {
    logger.info("ROUTE");
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );

    const json = await query.json();
    // console.log(json);

    const data = json.routes[0];

    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map?.getSource("route")) {
      (map.getSource("route") as any).setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map?.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson as any,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    //   console.log(data);

    // ponto final
    const ponto = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: end,
          },
        },
      ],
    };

    if (map.getLayer("end")) {
      (map.getSource("end") as any).setData(ponto);
    } else {
      map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: end,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      });
    }

    return data;
  } catch (error: any) {
    logger.error(error.message);
    toast(
      `Não foi possível calcular uma trajectória até o destino [${end.toString()}]`,
      { type: "error" }
    );
  }
  // add turn instructions here at the end
}
