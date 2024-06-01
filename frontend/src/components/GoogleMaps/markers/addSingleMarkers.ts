import { Marker } from "@/interfaces";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerWithLabel } from "@googlemaps/markerwithlabel";

// export const addSingleMarkers = ({
//   markers,
//   map,
// }: {
//   markers: ReadonlyArray<Marker>;
//   map: google.maps.Map | null | undefined;
// }) =>
//   //
//   markers.map(({ lat, lng, label, color }) => {
// ole.log(color)
//     var svg = window.btoa(`<svg width="800px" height="800px" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>map-marker</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="map-marker" transform="translate(78.000000, 468.000000)"> <g transform="translate(10.000000, 6.000000)"> <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="${color}"> </path> <circle id="Oval" fill="${color}" fill-rule="nonzero" cx="14" cy="14" r="7"> </circle> </g> </g> </g> </g> </g> </svg>`);

//     // const pinElement:  google.maps.marker.PinView = new google.maps.marker.PinView({
//     //   background: color
//     // })

//     const marker = new google.maps.Marker({
//       position: { lat, lng },
//       //content: pinElement,
//       map,
//     });

//     return marker;
//   });
export const addSingleMarkers1 = ({
  markers,
  map,
  loader,
  infoWindow
}: {
  markers: ReadonlyArray<Marker>;
  map: google.maps.Map | null | undefined;
  loader: Loader | null
  infoWindow: google.maps.InfoWindow | null
}) =>{
  //
  if (loader && infoWindow) {
  markers.map(({ lat, lng, label, color, timestamp }) => {
    loader.importLibrary('marker')
    .then(({AdvancedMarkerElement, PinElement}) => {
      const parser = new DOMParser();
      const svg = parser.parseFromString(
        '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="655.359" height="655.359" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd" viewBox="0 0 6.827 6.827"><path style="fill:#ff8f00;fill-rule:nonzero" d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923-1.343.923-.239.164.082-.278.462-1.564-1.292-.992-.23-.176.29-.008 1.63-.044.544-1.535.097-.274z"/><path style="fill:#e68100;fill-rule:nonzero" d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923V.98z"/><path style="fill:none" d="M0 0h6.827v6.827H0z"/></svg>' ,
        'image/svg+xml');

      const pinBackground = new PinElement({
        background: color !== 'gold' ? color : 'black',
        glyphColor: '#000',
        borderColor: '#000',
        glyph: color === 'gold' ? svg.documentElement : undefined, 
    });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: { lat, lng },
        content: pinBackground.element,
        gmpClickable: true,
        title: label
      })
      marker.addListener('click', () => {
        infoWindow.close()
        
        const latestText = color === 'gold' ? '(nyeste posisjon)\r\n' : ''

        infoWindow.setContent(label + latestText);
        infoWindow.setOptions({
          headerContent: Intl.DateTimeFormat("nb-NO", {
            dateStyle: 'full',
          }).format(new Date(timestamp)),
        })

        infoWindow.open(marker.map, marker);
      });
    })

    return;
  })}};
