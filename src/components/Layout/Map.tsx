import React from "react";
import mapboxgl from "mapbox-gl";

import type { Tour } from "../../features/tours/tourSlice";
import styles from "./Map.module.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGF2ZWw0MTg4OTAiLCJhIjoiY2txYmVicmhpMG0wNTJ0bDljaWh3bDUzOCJ9.4LwEjaVwL4epuhrKarVqsw";

const Map: React.FC<Pick<Tour, "locations">> = ({ locations }) => {
  const mapContainerRef = React.useRef();
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      //@ts-ignore
      container: mapContainerRef.current,
      style: "mapbox://styles/pavel418890/ckpykb4rp25n617qubc9lnr00",
      scrollZoom: false,
    });
    map.on("load", () => {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = styles.marker;
        //@ts-ignore
        new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([location.longitude, location.latitude])
          .addTo(map);
        new mapboxgl.Popup({
          offset: 15,
        })
          .setLngLat([location.longitude, location.latitude])
          .setHTML(`<p>Day ${location.day}: ${location.name}</p>`)
          .addTo(map);
        bounds.extend([location.longitude, location.latitude]);
      });
      map.fitBounds(bounds, {
        padding: {
          top: 300,
          bottom: 150,
          left: 100,
          right: 100,
        },
      });
      //@ts-ignore
      setMap(map);
    });

    return () => map.remove();
  }, []);

  return (
    <section className={styles.map}>
      <div
        //@ts-ignore
        ref={mapContainerRef}
        className={styles.mapContainer}
      />
    </section>
  );
};
export default Map;
