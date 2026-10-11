# DisasterSafe

### Real-Time Crisis Communication for Tourists During Extreme Weather Events

**TravelTech | 24-Hour Hackathon | Mobile-First Emergency Assistance Prototype**

DisasterSafe is a mobile-first crisis information and navigation prototype designed to help tourists understand extreme-weather risks, locate nearby assistance, and retain essential information when connectivity is unreliable. It combines location-aware weather information, translated-communication readiness, cached emergency resources, and map-based navigation in one accessible interface.

> **Safety notice:** DisasterSafe is a hackathon prototype, **not** an official emergency warning or rescue-dispatch service. Demonstration shelters and hazards are not verified real-world facilities or incidents. Suggested routes are **not certified evacuation routes**. Always follow local authorities and emergency services.

## 1. Problem Statement

**Context:** When localized extreme weather events occur—such as flash floods or severe cyclones—foreign tourists are particularly vulnerable because they may not know the local geography, language, or emergency procedures.

**Problem:** Weather warnings, emergency broadcasts, and safe-zone declarations are fragmented and often not translated or localized for visitors. Travelers may struggle to identify affected areas, locate trusted assistance, and understand official instructions, leaving them vulnerable to misinformation.

**Impact:** This communication gap can cause confusion, unsafe travel decisions, delayed access to assistance, and unnecessary pressure on rescue services during critical periods.

## 2. Our Solution

DisasterSafe brings relevant crisis information into a single location-aware experience:

- **Locate:** Use GPS to display the tourist's position and nearby assistance points.
- **Understand:** Show current weather, short-term forecasts, and understandable risk indicators.
- **Navigate:** Display suggested road routes to selected assistance points, with clear warnings about limitations.
- **Prepare offline:** Store shelter records, alerts, weather forecasts, and previously requested routes locally.
- **Communicate:** Prepare an offline SOS queue for later authenticated synchronization (delivery integration planned).
- **Expand access:** Add multilingual text and voice-based emergency instructions in later modules.

The goal is to reduce information fragmentation and help tourists make better-informed decisions without claiming to replace official emergency communication.

## 3. Features and Development Status

The following reflects code **provided through Modules 01–05**. Individual features still require end-to-end testing on the target Android build.

| Module | Feature | Status / limitation |
| --- | --- | --- |
| 01 | Application foundation, dashboard, navigation, design system | Prototype code provided; Expo starter-screen routing issue addressed |
| 02 | GPS tracking, map interface, shelter markers, expandable assistance panel | Prototype code provided; native MapLibre build/version must be verified |
| 03 | SQLite shelter and alert caching, network detection, pending SOS storage | Code provided; **offline map tiles are not yet implemented** |
| 04 | Open-Meteo weather, 12-hour forecast, heuristic weather-risk labels, cached forecasts | Code provided; risk labels are **not official warnings** |
| 05 | Shelter filters, route requests, route caching, hazard proximity checks, route display | Code provided; OSRM demo routing is online-only for new routes, hazards are simulated |
| 06 | SOS submission, authenticated backend sync, retries and delivery states | Planned |
| 07 | Emergency contacts, safety check-in, offline guides | Planned |
| 08 | Multilingual interface, text-to-speech and voice guidance | Planned |
| 09 | Supabase authentication, trusted data feeds, synchronization, notifications | Planned |
| 10 | Full integration, device testing, packaging, demo | Planned |

### Key safety and offline limitations

- GPS coordinates may remain available without internet, but a GPS fix is not guaranteed indoors or under poor reception.
- SQLite caches **data**, not map imagery. Full offline map rendering requires a separate licensed tile-package integration.
- Cached weather, alerts, and routes may be stale; the UI must show source and timestamps.
- A route from a road-routing engine is not necessarily passable or safe during a disaster.
- Sample shelter and hazard coordinates are for demonstration only, not real emergency directions.
- Saving an SOS locally or to a database does **not** mean emergency responders have received it.
- Ordinary smartphones cannot be assumed to support direct long-range radio communication without compatible hardware or infrastructure.

## 4. Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Mobile app | React Native + Expo + TypeScript | Cross-platform application development |
| Navigation | Expo Router | File-based screens and navigation |
| UI | React Native StyleSheet + Lucide icons | Mobile interface and visual indicators |
| Location | `expo-location` | GPS permissions and location updates |
| Native maps | MapLibre React Native | Interactive map, annotations, route overlay |
| Map data | OpenStreetMap-compatible licensed data | Base-map source; offline packaging pending |
| Weather | Open-Meteo Forecast API | Current conditions and hourly forecast |
| Routing | OSRM-compatible routing endpoint | Road geometry, distance, duration estimates |
| Local database | `expo-sqlite` | Shelters, alerts, weather, routes, pending SOS |
| Connectivity | `@react-native-community/netinfo` | Network reachability detection |
| File handling | `expo-file-system` | Foundation for later offline map packages |
| Backend (planned) | Supabase | Authentication, synchronized data and SOS records |

## 5. Project Structure

Representative layout based on the modules so far:

```text
DisasterSafe/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── map.tsx                 # Platform-specific map entry/adapters
│   │   └── alerts.tsx
│   ├── components/
│   │   └── BottomNav.tsx
│   ├── features/
│   │   ├── maps/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── weather/
│   │   │   ├── components/
│   │   │   ├── weatherService.ts
│   │   │   ├── weatherRepository.ts
│   │   │   ├── riskClassifier.ts
│   │   │   └── useWeather.ts
│   │   └── navigation/
│   │       ├── components/
│   │       ├── routeService.ts
│   │       ├── routeRepository.ts
│   │       ├── hazardAnalysis.ts
│   │       └── useNavigation.ts
│   ├── hooks/
│   ├── services/
│   │   └── offline/
│   │       ├── database.ts
│   │       ├── shelterRepository.ts
│   │       ├── alertRepository.ts
│   │       ├── sosQueue.ts
│   │       └── syncService.ts
│   └── theme/
│       └── colors.ts
├── assets/
├── app.json
├── package.json
└── README.md
```

Actual files may vary depending on the modules already copied into your repository. Use `src/app/` consistently for Expo Router if that is your active route directory.

## 6. Prerequisites

- Node.js (an active LTS version) and npm
- Git
- Android Studio with Android SDK, emulator **or** a connected Android device
- A compatible Expo development environment
- Internet connection for the initial installation and online API features

**Note:** MapLibre native features require a **development build**, not Expo Go. The browser preview may require a separate web-compatible map component; native map code should not be imported directly into the web bundle.

## 7. Setup Instructions

### Step 1 — Clone the project

```bash
git clone [<YOUR_REPOSITORY_URL>](https://github.com/Iniyan4/DisasterSafe.git)
cd <YOUR_PROJECT_DIRECTORY>
```

If the project is already on your computer, open its root directory instead.

### Step 2 — Install dependencies

```bash
npm install
npx expo install expo-location expo-sqlite expo-file-system expo-dev-client
npx expo install @react-native-community/netinfo
npm install lucide-react-native
```

For the native map implementation, install the MapLibre package that matches your project's Expo SDK and native configuration:

```bash
npx expo install @maplibre/maplibre-react-native
```

Verify the installed MapLibre API against the map component code before building; component exports differ across versions.

### Step 3 — Configure environment variables

Create `.env` in the project root:

```dotenv
EXPO_PUBLIC_ROUTING_URL=https://router.project-osrm.org
```

The public OSRM URL is for low-volume **demonstration use only**. Replace it with a suitably hosted service for production. Weather uses the public Open-Meteo API in the prototype. Do not commit credentials or private API keys. Any `EXPO_PUBLIC_` variable is visible in the built app.

### Step 4 — Configure app permissions

Ensure your existing `app.json` preserves Expo Router configuration and includes location permissions and the MapLibre native plugin appropriate to the installed version. Example:

```json
{
  "expo": {
    "name": "DisasterSafe",
    "slug": "disastersafe",
    "scheme": "disastersafe",
    "plugins": [
      "expo-router",
      "@maplibre/maplibre-react-native",
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Allow DisasterSafe to show nearby emergency resources."
        }
      ]
    ],
    "android": {
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

Merge this into the existing configuration rather than overwriting other project settings. Native dependencies or plugin changes require rebuilding the development app.

### Step 5 — Run the app

**Web preview** (only screens with web-compatible dependencies):

```bash
npx expo start --web --clear
```

**Android development build** (recommended for map and GPS features):

```bash
npx expo run:android
```

For subsequent JavaScript-only edits:

```bash
npx expo start --dev-client
```

Grant foreground location permission when prompted. Initial demonstration shelter markers are seeded around central Chennai; when testing elsewhere, nearby-distance filters may show no results.

### Step 6 — Verify the entry screen

If you see **Welcome to Expo** instead of DisasterSafe, check that:

1. `package.json` has `"main": "expo-router/entry"`.
2. The actual home route is `src/app/index.tsx` if the project uses `src/app`.
3. You have not left conflicting route files in both `app/` and `src/app/`.
4. The development server was restarted using `npx expo start --clear`.

## 8. Testing Guide

| Test | Expected behavior |
| --- | --- |
| App launch | DisasterSafe dashboard appears instead of the Expo starter screen |
| GPS permission | Permission prompt appears; current coordinates load when available |
| Nearby locations | Cached demonstration assistance points appear within selected radius |
| Live weather | Current conditions and forecast load while online |
| Weather offline | Previously cached weather displays with its timestamp and stale status |
| Alerts offline | Stored alert records remain readable and display their source |
| Route request | Online routing returns a suggested road path and estimates |
| Route offline | Previously cached route can be retrieved for matching start/destination |
| Hazard simulation | Clearly labeled demo hazard warnings appear near applicable routes |
| SOS queue | Pending SOS request is persisted locally; no delivery is implied |
| Full offline map | **Not yet supported** until offline tile integration is completed |

For offline testing, first open the app online to populate caches. Then enable airplane mode, restart the app, and verify that locally stored information remains accessible. Do not use actual emergencies to test prototype functions.

## 9. How It Works

```text
Tourist opens DisasterSafe
          |
          v
    Request GPS location
          |
          v
  Read local SQLite cache
          |
     Network available?
       /         \
     Yes          No
      |            |
Fetch weather   Display cached
and new data    information with age
      |            |
Store updates    | 
       \          /
        v        v
  Show weather + assistance points
                  |
                  v
          Select destination
                  |
                  v
       Fetch or reuse route
                  |
                  v
    Show route + hazard warnings
                  |
                  v
      Follow official guidance
```

## 10. Roadmap

**Next priorities:**

1. Implement and test authenticated SOS submission and safe offline retry behavior.
2. Add multilingual text and voice-based emergency guidance.
3. Integrate trusted government alerts and verified shelter feeds, with source attribution and timestamps.
4. Add a properly licensed offline map package and airplane-mode rendering.
5. Add government-verified road closures or evacuation corridors where an authoritative feed is available.
6. Complete Android device testing, accessibility review, and a repeatable demo.

## 11. Privacy, Trust & Responsible Use

- Request location access only when needed and explain why it is used.
- Keep emergency information source-labeled and timestamped.
- Do not describe demonstration data as verified shelters or hazards.
- Avoid collecting unnecessary personal information.
- Local SQLite data is not encrypted by default; sensitive records need additional protection.
- Never treat SOS database insertion as confirmation that a rescue team was dispatched.
- If offline, the app cannot guarantee message transmission or official warning updates.

## 12. Team and Contributions

Built as a three-person, 24-hour hackathon project. A suggested division of work:

- **Mobile UI & experience:** Dashboard, navigation, maps, multilingual and accessibility interfaces.
- **Data & services:** GPS, weather, shelter repositories, alerts, caching, and routing integration.
- **Emergency workflows & integration:** SOS, synchronization, end-to-end testing, packaging, and demo preparation.

Replace this section with actual team member names and responsibilities before submission.

## 13. Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [MapLibre](https://maplibre.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Open-Meteo](https://open-meteo.com/)
- [OSRM](https://project-osrm.org/)

Review and comply with the relevant API, tile, and attribution requirements before distributing the application.

---

**DisasterSafe — Better information when every moment matters.**

**Demo and APK** : https://drive.google.com/drive/folders/1G8cxr_nOPhGT_soFfpN1ZtBbd6p9i8fZ?usp=drive_link
