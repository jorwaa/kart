import React, { useEffect, useState } from "react";
import { Checkin, Checkins, CheckinsByDay, Marker, Markers } from "@/interfaces";
import { DatePicker } from "./DatePicker/DatePicker";

import { GoogleMaps2 } from "./GoogleMaps/GoogleMaps";
import { Loader } from "@googlemaps/js-api-loader";
import getAll from "../api/get";

function App() {

  const [checkins, setCheckin] = useState<Checkins>({all: [], byDay: {}, activeDays: []});
  const [markers, setMarkers] = useState<Markers>({latest: null, daysIncluded: [], markers: []});


  const [loader, setLoader] = useState<Loader | null>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDuRdDO6Cg9bSVpubvWVDq-4sKZzgcFD-Y",
      version: "weekly",
      libraries: ["maps", "marker", "places"]
    });
    setLoader(loader)
  }, [])

  const colorArray: string[] = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabed4", "#469990", "#dcbeff", "#9A6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#a9a9a9"]


  useEffect(() => {
    getAll().then(list => {
      console.log(list)
      if (list.length > 0) {
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
        console.log("ASDASD")
        console.log(latest)
          const latestMarker: Marker = { lat: latest.lat, lng: latest.lon, label: (new Date(latest.timestamp)).toLocaleTimeString(), color: "gold", timestamp: latest.timestamp }
          setMarkers({... markers, latest: latestMarker})
      } 
  })}, []);


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

  return (
    <>
    <div style={{display: "flex", flex: "none", width: "100%", height: "20%", overflowX: "auto", justifyContent: "center"}}>
    {checkins?.activeDays.map((date: string, i: number) => (
      <DatePicker color={colorArray[i%colorArray.length]} onSelect={() => addMarkersforDay(date, colorArray[i%colorArray.length])} onUnSelect={() => removeMarkersforDay(date)} antall={""} date={date} key={date} />
    ))}
    </div>
      <GoogleMaps2 markers={[...markers.markers, ... markers.latest ? [markers.latest] : []]} center={(markers.latest ? { lat: markers.latest.lat, lng: markers.latest.lng } : null)} loader={loader} />
  </>
  )
};

export default App;
