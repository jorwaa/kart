import { Checkin } from "@/interfaces";

export default async function post(coordinates: { lat: number; lon: number }): Promise<Checkin> {
  const response = await fetch(process.env.REACT_APP_PUBLIC_API + '/checkin', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br, zstd",
    },
    body: JSON.stringify(coordinates),
  });
  return await response.json();
}