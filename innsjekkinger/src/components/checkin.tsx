
import get from "./../api/get";
import post from "./../api/post";
import { Checkin, Coordinates } from "@/interfaces";
import React, { useEffect, useState } from "react";

function CheckIn() {

  const [canPost, setCanPost] = useState<Boolean>(true)
  const [reason, setReason] = useState<string>("")


  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

  const [checkinSuccess, setCheckinSuccess] = useState<Boolean>(false)
  const [response, setResponse] = useState<string | null>()


  useEffect(() => {tryGetGeolocation()}, [])


  const tryGetGeolocation = () => {
    console.log('tryGetGeolocation')
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setCoordinates({ lat: coords.latitude, lon: coords.longitude })
      })
    }
    return
  }

async function foo() {
  await get().then(list => {
    console.log(list)
    let newestDate = (list.length > 0) ? new Date(list[0].timestamp).getTime() : new Date(0).getTime()
    let fifteenMinutes = 15 * 60 * 1000
    let newestPlusFifteenMnutes = newestDate + fifteenMinutes
    if (new Date(newestPlusFifteenMnutes) > new Date()) {
      setCanPost(false)
      setReason("You can only checked in once during the past 15 minutes")
  } else {
  
    if (coordinates !== null && canPost) {
      try {
        post(coordinates).then(data => {
          setResponse(`data.lat: ${data.lat} lon: ${data.lon} timestamp: ${data.timestamp}`)
          setCheckinSuccess(true)
          setCanPost(false)
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
  }
  )

}


  return (
    <>
        <div>
          {<h1>Check-In</h1>}
        {canPost && <button onClick={() => foo()}>Check-In</button>}
        {canPost !== true && <p>{reason}</p>}
        </div>
        <div>
          {response && <p>{response}</p>}
        </div>
    </>  
)
};


export {CheckIn}