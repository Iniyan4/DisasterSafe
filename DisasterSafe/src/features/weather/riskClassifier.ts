
import {
    WeatherCondition,
    WeatherRisk,
    RiskLevel,
} from './types';

const priority: Record<RiskLevel, number> = {
    low: 0,
    moderate: 1,
    high: 2,
    critical: 3,
};

export function classifyWeatherRisk(
    weather: WeatherCondition
): WeatherRisk {
    let level: RiskLevel = 'low';
    const reasons: string[] = [];

    function raise(
        nextLevel: RiskLevel,
        reason: string
    ) {
        reasons.push(reason);

        if (priority[nextLevel] > priority[level]) {
            level = nextLevel;
        }
    }

    if (weather.windGust >= 90) {
        raise(
            'critical',
            'Very strong wind gusts reported'
        );
    } else if (weather.windGust >= 60) {
        raise('high', 'Strong wind gusts reported');
    } else if (weather.windGust >= 40) {
        raise(
            'moderate',
            'Elevated wind gusts reported'
        );
    }

    if (weather.precipitation >= 20) {
        raise(
            'critical',
            'Very heavy current precipitation'
        );
    } else if (weather.precipitation >= 10) {
        raise('high', 'Heavy current precipitation');
    } else if (weather.precipitation >= 3) {
        raise(
            'moderate',
            'Significant current precipitation'
        );
    }

    if (weather.feelsLike >= 45) {
        raise('high', 'Dangerous apparent heat');
    } else if (weather.feelsLike >= 38) {
        raise('moderate', 'High apparent heat');
    }

    // Open-Meteo WMO thunderstorm codes.
    if ([95, 96, 99].includes(weather.weatherCode)) {
        raise('high', 'Thunderstorm conditions');
    }

    const titles: Record<RiskLevel, string> = {
        low: 'No elevated indicators',
        moderate: 'Weather caution',
        high: 'Potentially hazardous weather',
        critical: 'Severe weather indicators',
    };

    const descriptions: Record<RiskLevel, string> = {
        low:
            'No elevated conditions were detected by the demo rules. Continue checking official advisories.',
        moderate:
            'Some weather indicators are elevated. Stay informed and plan ahead.',
        high:
            'Hazardous weather indicators were detected. Review official guidance and avoid unnecessary exposure.',
        critical:
            'Severe weather indicators were detected. Seek current official instructions immediately.',
    };

    return {
        level,
        title: titles[level],
        description: descriptions[level],
        reasons,
    };
}
