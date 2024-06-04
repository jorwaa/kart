import { Checkin } from "@/interfaces";

export default async function getAll(): Promise<Checkin[]> {
  const response = await fetch(process.env.REACT_APP_PUBLIC_API + "/checkin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br, zstd",
    },
  
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  } 
  const json = await response.json()
  if (!json) {
    throw new Error("Failed to parse data");
  }
  return json
}