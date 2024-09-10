import { useEffect } from "react";

export function useOnClick(
  cb: (long: number, lat: number) => void,
  map?: mapboxgl.Map
) {
  useEffect(() => {
    if (!map) return;

    const clickHandler = (evt: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      cb(evt.lngLat.lng, evt.lngLat.lat);
    };

    map.on("click", clickHandler);

    return () => {
      map.off("click", clickHandler);
    };
  }, [map, cb]);
}
