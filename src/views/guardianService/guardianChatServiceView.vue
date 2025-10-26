<template>
    <div class="container d-flex flex-column justify-content-center align-items-center pt-4">
        <h1 class="text-center mb-4">Help Centres Near You</h1>
        <button v-if="directionsShowing" @click="goBackToSearch" 
                style="background-color: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-bottom: 16px;">
            ← Back to Search
        </button>
        <div ref="mapContainer" style="width: 100%; height: 600px;"></div>
    </div>
</template>

<script setup>
import { getCollectionList } from '@/services/service';
import { MapboxSearchBox } from '@mapbox/search-js-web';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, onUnmounted, ref } from 'vue';

const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const mapContainer = ref(null);
const centreMarkers = ref({})
const centreLocations = ref([]);
const directionsShowing = ref(false);
let mapObj
let searchBox;
let directions;

// Function to go back to search mode
const goBackToSearch = () => {
    if (directionsShowing.value && mapObj) {
        // Clear the directions route before removing the control
        directions.setDestination([]);
        directions.setOrigin([]);
        mapObj.removeControl(directions);
        mapObj.addControl(searchBox, 'top-left');
        directionsShowing.value = false;
    }
};

onMounted(async () => {
    try {
        centreLocations.value = await getCollectionList('centre-locations');

        mapboxgl.accessToken = accessToken;
        const newMap = new mapboxgl.Map({
            container: mapContainer.value,
            style: "mapbox://styles/mapbox/standard",
            center: [144.9631, -37.8136], // starting position [lng, lat]
            zoom: 10,
            maxBounds: [
                // Restricts to Melbourne
                [140.9612, -39.1376], // Southwest coordinates
                [149.9760, -33.9810]  // Northeast coordinates
            ]
        });
        mapContainer.value = newMap;
        mapObj = newMap;

        searchBox = new MapboxSearchBox()
        searchBox.accessToken = accessToken;
        searchBox.options = {
            types: [
                "country", 
                "region", 
                "place", 
                "postcode", 
                "district", 
                'city', 
                "locality", 
                "neighborhood", 
                "street", 
                "address", 
                "poi"
            ],
        }
        searchBox.marker = true;
        searchBox.mapboxgl = mapboxgl;
        newMap.addControl(searchBox, 'top-left');

        // eslint-disable-next-line no-undef
        directions = new MapboxDirections({
            accessToken: accessToken,
            unit: 'metric',
            interactive: false,
            profile: 'mapbox/driving',
            controls: {
                inputs: true,
                instructions: true,
                profileSwitcher: true
            },
            instructions: {
                showWaypointInstructions: false
            }
        });

        const fullscreenControl = new mapboxgl.FullscreenControl()
        newMap.addControl(fullscreenControl, 'top-right');

        const navControl = new mapboxgl.NavigationControl();
        newMap.addControl(navControl, 'top-right');

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });
        newMap.addControl(geolocate, 'top-right');

        // Function to handle getting directions to a specific location
        const getDirectionsTo = (longitude, latitude) => {
            // Get the current search text from the search box
            const searchInput = searchBox.input
            console.log('Search Input:', searchInput.value);
            const originText = searchInput ? searchInput.value.trim() : '';
            
            if (!directionsShowing.value) {
                // First time showing directions - remove search box and add directions control
                newMap.removeControl(searchBox);
                newMap.addControl(directions, 'top-left');
                directionsShowing.value = true;
            }
            
            // Set the origin if there's text in the search box
            if (originText) {
                directions.setOrigin(originText);
            }
            
            // Set or update the destination
            directions.setDestination([longitude, latitude]);
        };
        
        // Load markers
        centreLocations.value.forEach((centre) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <h5>${centre.name}</h5>
                <p>${centre.address}</p>
                <button onclick="window.getDirectionsTo(${centre.coordinates.longitude}, ${centre.coordinates.latitude})" 
                        style="background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 8px;">
                    Get Directions
                </button>
                `
            );

            const marker = new mapboxgl.Marker()
                .setLngLat([centre.coordinates.longitude, centre.coordinates.latitude])
                .setPopup(popup)
                .addTo(newMap);
            centreMarkers.value[centre.name] = marker;
        });

        // Make function accessible for marker get directions
        window.getDirectionsTo = getDirectionsTo;
    } catch (error) {
        console.error('Error loading centre locations:', error);
    }
});

onUnmounted(() => {
    if (mapContainer.value) {
        mapContainer.value.remove();
        mapContainer.value = null;
    }
    // Clean up global function
    if (window.getDirectionsTo) {
        delete window.getDirectionsTo;
    }
});

</script>