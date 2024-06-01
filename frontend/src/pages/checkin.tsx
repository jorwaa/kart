import get from "@/api/get";
import post from "@/api/post";
import { Layout } from "@/components";
import { Checkin, Coordinates } from "@/interfaces";
import React, { useEffect, useState } from "react";

export default function CheckIn() {

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
    console.log(list[0])
    let newestDate = new Date(list[0].timestamp).getTime()
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
      <Layout>
        <div>
          {<h1>Check-In</h1>}
        {canPost && <button onClick={() => foo()}>Check-In</button>}
        {canPost !== true && <p>{reason}</p>}
        </div>
        <div>
          {response && <p>{response}</p>}
        </div>
      </Layout>
    </>  
)
};


