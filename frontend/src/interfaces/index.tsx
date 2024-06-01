export type Coordinates = {
  lat: number;
  lon: number;
};

export type Checkin = {
  lat: number;
  lon: number;
  color: string;
  timestamp: string;
}

export type Marker = {
  lat: number;
  lng: number;
  label: string;
  color: string;
  timestamp: string;
}

export type Markers = {
  latest: Marker|null;
  daysIncluded: string[];
  markers: Marker[];
}

export type Checkins = {
  all: Checkin[];
  byDay: CheckinsByDay
  activeDays: string[]
}

export type CheckinsByDay = {
  [key: string]: Checkin[];
}