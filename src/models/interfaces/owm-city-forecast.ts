export interface CityForecastData {
  city:    City;
  cnt:     number;
  cod:     string;
  list:    List[];
  message: number;
}
 
interface City {
  coord:      Coord;
  country:    string;
  id:         number;
  name:       string;
  population: number;
  sunrise:    number;
  sunset:     number;
  timezone:   number;
}
 
interface Coord {
  lat: number;
  lon: number;
}
 
interface List {
  clouds:     Clouds;
  dt:         number;
  dt_txt:     Date;
  main:       MainClass;
  pop:        number;
  rain?:      Rain;
  sys:        Sys;
  visibility: number;
  weather:    Weather[];
  wind:       Wind;
}
 
interface Clouds {
  all: number;
}
 
interface MainClass {
  feels_like: number;
  grnd_level: number;
  humidity:   number;
  pressure:   number;
  sea_level:  number;
  temp:       number;
  temp_kf:    number;
  temp_max:   number;
  temp_min:   number;
}
 
interface Rain {
  "3h": number;
}
 
interface Sys {
  pod: Pod;
}
 
enum Pod {
  D = "d",
  N = "n",
 }
 
interface Weather {
  description: Description;
  icon:        string;
  id:          number;
  main:        MainEnum;
}
 
enum Description {
  BrokenClouds = "broken clouds",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  LightRain = "light rain",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
}
 
enum MainEnum {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
}
 
interface Wind {
  deg:   number;
  gust:  number;
  speed: number;
}