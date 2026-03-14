import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, CheckCircle, MapPin, Navigation, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '@/Contexts/ThemeContext';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Purple Marker Icon using Lucide MapPin
const createCustomIcon = () => {
    const iconHtml = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            {/* Pulsing background effect */}
            <div className="absolute w-10 h-10 bg-primary/20 rounded-full animate-ping" />
            {/* Marker background */}
            <div className="relative flex items-center justify-center w-9 h-9 bg-primary rounded-full border-2 border-white shadow-lg shadow-primary/40">
                <MapPin className="w-5 h-5 text-white" />
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
        </div>
    );

    return L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

// Custom component to handle map centering
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center && center[0] && center[1]) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

export default function MapSearch({ className = '', initialLocation = '', points = null, height = '550px' }) {
    const [isClient, setIsClient] = useState(false);
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(!points);
    const [center, setCenter] = useState([12.8797, 121.7740]); // Philippines center
    const [zoom, setZoom] = useState(6);
    const { darkMode } = useTheme();
    const [customIcon, setCustomIcon] = useState(null);

    async function fetchMapData(location = '') {
        try {
            setLoading(true);
            const response = await axios.get(route('search.map-data'), {
                params: { location }
            });
            setManagers(response.data);
            
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
        setCustomIcon(createCustomIcon());
        
        if (points && points.length > 0) {
            setManagers(points);
            // Center on the first point or average of points
            const first = points[0];
            if (first.latitude && first.longitude) {
                setCenter([parseFloat(first.latitude), parseFloat(first.longitude)]);
                setZoom(points.length === 1 ? 14 : 12);
            }
            setLoading(false);
        } else if (!points) {
            fetchMapData(initialLocation);
        }
    }, [points, initialLocation]);

    if (!isClient) {
        return (
            <div className={`w-full rounded-3xl bg-muted/20 animate-pulse border-2 border-primary/20 ${className}`} style={{ height }} />
        );
    }

    const tileUrl = darkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <div className={`relative w-full rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] group ${className}`} style={{ height }}>
            {loading && (
                <div className="absolute inset-0 z-[1002] bg-background/60 backdrop-blur-md flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                        <span className="text-sm font-bold text-primary animate-pulse uppercase tracking-widest">Scanning Network...</span>
                    </div>
                </div>
            )}
            
            <MapContainer 
                center={center} 
                zoom={zoom} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                zoomControl={false}
                className="z-10"
            >
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={tileUrl}
                />
                
                {customIcon && managers.map((pm) => (
                    pm.latitude && pm.longitude && (
                        <Marker 
                            key={pm.id} 
                            position={[parseFloat(pm.latitude), parseFloat(pm.longitude)]}
                            icon={customIcon}
                        >
                            <Popup className="custom-popup" maxWidth={250}>
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {pm.business_name?.[0] || pm.title?.[0] || 'P'}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-gray-900 dark:text-white m-0 leading-tight truncate">
                                                {pm.business_name || pm.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                {pm.rating && (
                                                    <div className="flex items-center">
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                        <span className="ml-1 text-xs font-bold text-gray-700 dark:text-gray-300">{pm.rating}</span>
                                                    </div>
                                                )}
                                                {pm.is_verified && (
                                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                )}
                                                {pm.property_type && (
                                                    <span className="text-[10px] font-bold text-primary uppercase">{pm.property_type}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-4">
                                        <MapPin className="w-3.5 h-3.5 text-primary/70" />
                                        {pm.city || pm.location}, {pm.province || ''}
                                    </p>
                                    
                                    {pm.business_name ? (
                                        <a 
                                            href={route('property-managers.show', pm.id)}
                                            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group/btn"
                                        >
                                            View Full Profile
                                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    ) : (
                                        <div className="text-[10px] text-muted-foreground italic border-t border-border pt-2">
                                            Portfolio Property
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}

                {/* Legend/Info Overlay */}
                {!points && (
                    <div className="absolute top-6 right-6 z-[1000]">
                        <div className="bg-card/90 backdrop-blur-xl p-3 px-5 rounded-2xl border border-primary/20 shadow-xl flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                                {managers.length} Active Managers Found
                            </span>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
                    <div className="bg-card/90 backdrop-blur-xl p-3 px-4 rounded-2xl border border-primary/20 shadow-xl pointer-events-none max-w-[200px]">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Interactive Map</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {points ? 'Explore properties managed by this professional.' : 'Click on a marker to see manager details and explore services in your area.'}
                        </p>
                    </div>
                </div>
            </MapContainer>
        </div>
    );
}
