
import { useMemo, useState } from 'react';

import {
    GeoJSONSource,
    LineLayer,
    ViewAnnotation,
} from '@maplibre/maplibre-react-native';

import type { ShelterFilter } from
        '../navigation/components/ShelterFilters';

import { ShelterFilters } from
        '../navigation/components/ShelterFilters';

import { RouteSummary } from
        '../navigation/components/RouteSummary';

import { useNavigation } from
        '../navigation/useNavigation';

import { demoHazards } from
        '../navigation/hazards';

import { distanceKm } from './utils/geo';
