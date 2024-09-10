import { logger } from "@/Logger";
import MapContext from "@/contexts/MapContext";
import { getRoute } from "@/helpers/functions/getRoute";
import { useMyCurrentLocation } from "@/hooks/map/useMyCurrentLocation";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface MapProps extends React.ComponentPropsWithoutRef<"div"> {
  isDirectionEnabled?: boolean;
  isCurrentLocationEnabled?: boolean;
  endPoint?: [number, number];
  cb?: (lngLat: [number, number]) => void;
}

function Map({
  id,
  isDirectionEnabled = false,
  isCurrentLocationEnabled = false,
  endPoint,
  className,
  cb,
  ...props
}: MapProps) {
  const { map } = useContext(MapContext);
  const [start, setStart] = useState<[number, number]>();

  useEffect(() => {
    if (!start) return;

    if (isDirectionEnabled && !endPoint) {
      throw new Error(
        "isDirectionEnabled está abilitado endPoint é obrigatório"
      );
    }

    if (isDirectionEnabled) {
      try {
        getRoute(map!, start, endPoint!);
      } catch (error: any) {
        logger.error(error.message);
      }
    }
  }, [endPoint, start]);

  useMyCurrentLocation(
    map,
    (lng, lat) => {
      {
        setStart(() => [lng, lat]);
        cb && cb([lng, lat]);
      }
    },
    isCurrentLocationEnabled
  );

  return (
    <div id="map" className={twMerge("w-full h-96", className)} {...props} />
  );
}

export default Map;
