// import {
//   MarkerClusterer,
//   SuperClusterAlgorithm,
// } from "@googlemaps/markerclusterer";

// import { Marker } from "@/interfaces";

// export const addClusterMarkers = ({
//   markers,
//   map,
// }: {
//   markers: ReadonlyArray<Marker>;
//   map: google.maps.Map | null | undefined;
// }) => {
//   const clusterMarkers = addSingleMarkers({ markers, map });

//   // Merge markers into clusters
//   new MarkerClusterer({
//     markers: clusterMarkers,
//     map,
//     algorithm: new SuperClusterAlgorithm({
//       radius: 350, // cluster size
//     }),
//   });
// };
