import { useEffect, useRef, useState } from "react";

import { Marker } from "@/interfaces";
import { Loader } from '@googlemaps/js-api-loader';
import { addSingleMarkers1 } from "./markers/addSingleMarkers";


//const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
//const DEFAULT_ZOOM = 4;

// export const GoogleMaps = ({
//   markers,
//   useClusters = false,
//   mapId,
//   className,
// }: {
//   markers: ReadonlyArray<Marker>;
//   useClusters?: boolean;
//   mapId: string;
//   className?: string;
// }) => {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Display the map
//     if (ref.current) {
//       const map = new window.google.maps.Map(ref.current, {
//         center: DEFAULT_CENTER,
//         zoom: DEFAULT_ZOOM,
//         mapId,
//       });

//       // Displays cluster markers or single markers on map when called
//       useClusters
//         ? addClusterMarkers({ markers, map })
//         : addSingleMarkers({ markers, map });
//     }
//   }, [ref, mapId, markers, useClusters]);

//   return (
//     <div
//       className={className}
//       id={`map-${mapId}`}
//       ref={ref}
//       style={{ width: "100%", height: "80%" }}
//     />
//   );
// };




export const GoogleMaps2 = ({
  center,
  markers,
  loader,
  options,
  setOptions
}: {
  center: { lat: number; lng: number }|null;
  markers: ReadonlyArray<Marker>;
  loader: Loader | null
  options: {center: { lat: number; lng: number }; zoom: number; mapTypeId: string;}|null
  setOptions: (options: {center: { lat: number; lng: number }; zoom: number; mapTypeId: string;}|null) => void
}) =>
{


  const ref = useRef<HTMLDivElement | null>(null);
  const options1 = localStorage.getItem('mapOptions') ? JSON.parse(localStorage.getItem('mapOptions')!) : null
  useEffect(() => {
    const existingMap = false
    if (ref.current && loader) {
    loader.importLibrary('maps')
    .then(({Map, InfoWindow, MapTypeId}) => {
      console.log(existingMap)
      const mapOptions = {
        center:  options1 ? options1.center : {
          lat: center ? center.lat : 35.652832,
          lng: center ? center.lng : 139.839478
        },
        zoom:  options1 ? options1.zoom : 4,
        mapTypeId: options1 ? options1.mapTypeId : MapTypeId.HYBRID,
        mapId: "fedfb0d3742b540a",
      };


      const map = new Map(ref.current!, mapOptions);
      const infoWindow = new InfoWindow()
      addSingleMarkers1({ markers, map, loader, infoWindow})
      
      map.addListener('dragend', () => {

        localStorage.setItem('mapOptions', JSON.stringify({center: map.getCenter()!.toJSON(), zoom: map.getZoom()!, mapTypeId: map.getMapTypeId()!}))

        // setOptions1({
        //   center:  map.getCenter()!.toJSON(),
        //   zoom:  map.getZoom()!,
        //   mapTypeId: map.getMapTypeId()!
        // })
      });
    })
  }
});

  return (
    <div
      id={`map2`}
      ref={ref}
      style={{ width: "100vw", height: "80vh", border: "1px solid black" }}
    />
  );
};
