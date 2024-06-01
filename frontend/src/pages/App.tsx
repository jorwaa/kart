import React, { useEffect, useState, Key } from "react";
// import {
//   GoogleMaps,
//   GoogleMapsWrapper,
//   LOCATIONS,
//   Layout,
// } from "../components";
import getAll from "@/api/get";
import { Checkin, Checkins, CheckinsByDay, Marker, Markers } from "@/interfaces";
import { DatePicker } from "@/components/DatePicker/DatePicker";

import { GoogleMaps2 } from "@/components/GoogleMaps/GoogleMaps";
import { Loader } from "@googlemaps/js-api-loader";

function App() {

  const [checkins, setCheckin] = useState<Checkins>({all: [], byDay: {}, activeDays: []});
  const [markers, setMarkers] = useState<Markers>({latest: null, daysIncluded: [], markers: []});
  const [includedDays, setIncludedDays] = useState<Date[]>([]);

  const [days, setDays] = useState<string[]>([]);

  const [loader, setLoader] = useState<Loader | null>(null)

  useEffect(() => {
    const loader1 = new Loader({
      apiKey: "AIzaSyDuRdDO6Cg9bSVpubvWVDq-4sKZzgcFD-Y",
      version: "weekly",
      libraries: ["maps", "marker", "places"]
    });
    setLoader(loader1)
  }, [checkins])

  const colorArray: string[] = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabed4", "#469990", "#dcbeff", "#9A6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#a9a9a9"]


  useEffect(() => {
    getAll() .then(list => {
      // Lager checkin-structen med all nødvendig informasjon:
      const daysAvailable = list.map(c => new Date(new Date(c.timestamp).setHours(0, 0, 0, 0)).getTime()).sort()
      const daysFiltered = Array.from(new Set(daysAvailable))
      const checkinsByDay: CheckinsByDay = {}
      const byDay = daysFiltered.map(d => {
        const key = new Date(d)
        const nextDay = new Date(d)
        nextDay.setDate(key.getDate() + 1)
        const values = list.filter((c: Checkin) => {
          const date = new Date(c.timestamp)
          return ((date >= key) && date <= nextDay)
        })
        checkinsByDay[key.toDateString()] = values
        return { key, values }
      })
      const latest = list.reduce((c, b) => new Date(c.timestamp).getTime() > new Date(b.timestamp).getTime() ? c : b)
        setCheckin({... checkins, all: list, byDay: checkinsByDay, activeDays: daysFiltered.map(d => new Date(d).toDateString())})

        const latestMarker: Marker = { lat: latest.lat, lng: latest.lon, label: (new Date(latest.timestamp)).toLocaleTimeString(), color: "gold", timestamp: latest.timestamp }
        setMarkers({... markers, latest: latestMarker})
      }
      )
    }
, [checkins, markers]);


  const removeMarkersforDay = (day: string) => {
    if (markers.daysIncluded.includes(day)) {
      const newMarkers = markers.markers.filter(el => !(checkins.byDay[day].map(c => c.timestamp).includes(el.timestamp)))
      setMarkers({...markers, daysIncluded: markers.daysIncluded.filter(d => d !== day), markers: newMarkers})
    }
    return;
  }

  const addMarkersforDay = (day: string, color: string) => {
    if (!markers.daysIncluded.includes(day)) {
      const newMarkers = checkins.byDay[day].map(c => ({ lat: c.lat, lng: c.lon, label: (new Date(c.timestamp)).toLocaleTimeString(), color: color, timestamp: c.timestamp }))
      setMarkers({...markers, daysIncluded: [...markers.daysIncluded, day], markers: [...markers.markers, ...newMarkers]})
    }

  }

// let map: google.maps.Map;
// async function initMap(): Promise<void> {
//   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//   map = new Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
//   console.log("AJSHDGSAJ")
// }


  // initMap().then(() => {
  //   console.log("mapInitsed")
  // })



  return (
    <>
    <div style={{display: "flex", flex: "none", width: "100%", height: "20%", overflowX: "auto", justifyContent: "center"}}>
    {checkins?.activeDays.map((date: string, i: number) => (
      <DatePicker color={colorArray[i%colorArray.length]} onSelect={() => addMarkersforDay(date, colorArray[i%colorArray.length])} onUnSelect={() => removeMarkersforDay(date)} antall={""} date={date} key={date} />
    ))}
    </div>

  {/* <GoogleMapsWrapper>
    <Layout> */}
      <GoogleMaps2  markers={[...markers.markers, ... markers.latest ? [markers.latest] : []]} center={(markers.latest ? { lat: markers.latest.lat, lng: markers.latest.lng } : null)} loader={loader} />
    {/* </Layout>
  </GoogleMapsWrapper> */}
  </>
  )
};

export default App;
