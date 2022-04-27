export interface Point {
  name: string;
  latitude: number;
  longitude: number;
}
export interface StartLocation extends Point {
  address: string;
  tour: number;
}
export interface Locations extends Point {
  day: number;
  tour: number;
}
