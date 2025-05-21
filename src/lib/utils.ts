import type { WeatherEmojiData } from "@/entities/weather";
import { WeatherEmoji } from "@/lib/constant"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function greeting(): string {
	const currentHour = new Date().getHours();

	if (currentHour >= 0 && currentHour < 12) {
		return "Good morning";
	} else if (currentHour >= 12 && currentHour < 18) {
		return "Good afternoon";
	}
	return "Good evening";
}

export function mapWeatherCodeToEmoji(code: number): WeatherEmojiData {
  if (code === 0 && greeting() === "Good evening") {
    return WeatherEmoji.ClearSkyNight;
  }

  switch (code) {
    case 0:
      return WeatherEmoji.ClearSkyDay; // Clear sky
    case 1:
      return WeatherEmoji.MainlyClear;
    case 2:
      return WeatherEmoji.PartlyCloudy; // Partly cloudy (1/8 chance of being clear)
    case 3:
      return WeatherEmoji.Overcast; // Mainly clear, partly cloudy, and overcast
    case 45:
    case 48:
      return WeatherEmoji.Fog; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55:
      return WeatherEmoji.Drizzle; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57:
      return WeatherEmoji.FreezingDrizzle; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65:
      return WeatherEmoji.Rain; // Rain: Slight, moderate and heavy intensity
    case 66:
    case 67:
      return WeatherEmoji.FreezingRain; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75:
      return WeatherEmoji.SnowFall; // Snow fall: Slight, moderate, and heavy intensity
    case 77:
      return WeatherEmoji.SnowGrains; // Snow grains
    case 80:
    case 81:
    case 82:
      return WeatherEmoji.RainShowers; // Rain showers: Slight, moderate, and violent
    case 85:
    case 86:
      return WeatherEmoji.SnowShowers; // Snow showers slight and heavy
    case 95:
      return WeatherEmoji.Thunderstorm; // Thunderstorm: Slight or moderate
    case 96:
    case 99:
      return WeatherEmoji.ThunderstormWithHail; // Thunderstorm with slight and heavy hail
    default:
      return WeatherEmoji.ClearSkyDay; // Default to clear sky if code is unknown
  }
}
