import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, CheckCircle, MapPin, Navigation } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '@/Contexts/ThemeContext';

// Fix for default Leaflet icon issues with Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom component to handle map centering
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

export default function MapSearch({ className = '', initialLocation = '' }) {
    const [isClient, setIsClient] = useState(false);
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState([12.8797, 121.7740]); // Philippines center
    const [zoom, setZoom] = useState(6);
    const { darkMode } = useTheme();

    async function fetchMapData(location = '') {
        try {
            setLoading(true);
            const response = await axios.get(route('search.map-data'), {
                params: { location }
            });
            setManagers(response.data);
            
            // If we have a specific location searched, we might want to adjust the map
            // For now, we'll keep the Philippines view or center on the first result if searching
            if (location && response.data.length > 0) {
                const first = response.data[0];
                setCenter([parseFloat(first.latitude), parseFloat(first.longitude)]);
                setZoom(10);
            }
        } catch (error) {
            console.error('Error fetching map data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setIsClient(true);
        fetchMapData();
    }, []);

    if (!isClient) {
        return (
            <div className={`w-full h-[500px] rounded-2xl bg-muted/20 animate-pulse border border-border ${className}`} />
        );
    }

    // Dark mode map tiles (CartoDB Dark Matter)
    // Light mode map tiles (CartoDB Positron)
    const tileUrl = darkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <div className={`relative w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-xl ${className}`}>
            {loading && (
                <div className="absolute inset-0 z-[1000] bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium text-muted-foreground">Loading Map...</span>
                    </div>
                </div>
            )}
            
            <MapContainer 
                center={center} 
                zoom={zoom} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                zoomControl={false}
            >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={tileUrl}
                />
                
                {managers.map((pm) => (
                    <Marker 
                        key={pm.id} 
                        position={[parseFloat(pm.latitude), parseFloat(pm.longitude)]}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1 min-w-[180px]">
                                <h3 className="font-bold text-gray-900 dark:text-white m-0 leading-tight">
                                    {pm.business_name}
                                </h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-2">
                                    <MapPin className="w-3 h-3" />
                                    {pm.city}, {pm.province}
                                </p>
                                
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center">
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                        <span className="ml-1 text-xs font-bold">{pm.rating}</span>
                                    </div>
                                    {pm.is_verified && (
                                        <div className="flex items-center gap-0.5 text-emerald-600">
                                            <CheckCircle className="w-3 h-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                                        </div>
                                    )}
                                </div>
                                
                                <a 
                                    href={route('property-managers.show', pm.id)}
                                    className="block w-full text-center py-2 px-3 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    View Profile
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Legend/Info Overlay */}
                <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg pointer-events-none">
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Navigation className="w-3 h-3 text-primary" />
                        <span>Showing {managers.length} Managers across Philippines</span>
                    </div>
                </div>
            </MapContainer>
        </div>
    );
}
