export interface WeatherUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
}

export interface WeatherCurrent {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
}

export type Weather = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  current_units: WeatherUnits;
  current: WeatherCurrent;
};

export type WeatherEmojiData = {
  name: string;
  emoji: string;
};
