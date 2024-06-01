import { Marker } from "@/interfaces";
import { Loader } from "@googlemaps/js-api-loader";

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
  const foo = markers.map(({ lat, lng, label, color, timestamp }) => {
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
    
      return marker  
    })
    }

)}};
