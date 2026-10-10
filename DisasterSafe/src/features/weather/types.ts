
export type RiskLevel =
    | 'low'
    | 'moderate'
    | 'high'
    | 'critical';

export type WeatherCondition = {
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    windGust: number;
    weatherCode: number;
    isDay: boolean;
};

export type HourlyForecast = {
    time: string;
    temperature: number;
    precipitationProbability: number;
    windSpeed: number;
    weatherCode: number;
};

export type WeatherData = {
    latitude: number;
    longitude: number;
    timezone: string;
    fetchedAt: string;
    current: WeatherCondition;
    hourly: HourlyForecast[];
};

export type WeatherRisk = {
    level: RiskLevel;
    title: string;
    description: string;
    reasons: string[];
};

export type WeatherResult = {
    data: WeatherData;
    source: 'live' | 'cache';
    isStale: boolean;
};
