import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '@/Contexts/ThemeContext';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Marker Icon Generator
const createCustomIcon = (color = 'var(--primary)') => {
    const iconHtml = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-primary/20 rounded-full animate-ping" />
            <div className="relative flex items-center justify-center w-9 h-9 bg-primary rounded-full border-2 border-white shadow-lg shadow-primary/40">
                <MapPin className="w-5 h-5 text-white" />
            </div>
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

// Component to handle dynamic map updates
function MapController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center && center[0] && center[1]) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

/**
 * Reusable Interactive Map Component
 * @param {string} mode - 'discovery' (fetches all) or 'portfolio' (shows specific items)
 * @param {Array} items - Initial items to display (for portfolio mode)
 * @param {Array} center - [lat, lng]
 * @param {number} zoom - initial zoom level
 * @param {string} height - CSS height
 */
export default function InteractiveMap({ 
    mode = 'discovery', 
    items: initialItems = null, 
    center: initialCenter = [12.8797, 121.7740], 
    zoom: initialZoom = 6,
    height = '550px',
    className = '',
    locationQuery = ''
}) {
    const [isClient, setIsClient] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState(initialCenter);
    const [mapZoom, setMapZoom] = useState(initialZoom);
    const { darkMode } = useTheme();

    useEffect(() => {
        setIsClient(true);
        if (mode === 'portfolio' && initialItems) {
            setItems(initialItems);
            if (initialItems.length > 0) {
                const first = initialItems[0];
                setMapCenter([parseFloat(first.latitude), parseFloat(first.longitude)]);
                setMapZoom(initialItems.length === 1 ? 15 : 12);
            }
            setLoading(false);
        } else {
            fetchDiscoveryData(locationQuery);
        }
    }, [mode, initialItems, locationQuery]);

    async function fetchDiscoveryData(location = '') {
        try {
            setLoading(true);
            const response = await axios.get(route('search.map-data'), { params: { location } });
            setItems(response.data);
            if (location && response.data.length > 0) {
                const first = response.data[0];
                setMapCenter([parseFloat(first.latitude), parseFloat(first.longitude)]);
                setMapZoom(10);
            }
        } catch (error) {
            console.error('Map Load Error:', error);
        } finally {
            setLoading(false);
        }
    }

    if (!isClient) return <div className={`w-full rounded-3xl bg-muted/20 animate-pulse border-2 border-primary/20 ${className}`} style={{ height }} />;

    const tileUrl = darkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <div className={`relative w-full rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] ${className}`} style={{ height }}>
            {loading && (
                <div className="absolute inset-0 z-[1002] bg-background/60 backdrop-blur-md flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
                            <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                        <span className="text-xs font-bold text-primary animate-pulse tracking-widest uppercase">Initializing...</span>
                    </div>
                </div>
            )}
            
            <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false} zoomControl={false}>
                <MapController center={mapCenter} zoom={mapZoom} />
                <TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url={tileUrl} />
                
                {items.map((item) => (
                    item.latitude && item.longitude && (
                        <Marker key={item.id} position={[parseFloat(item.latitude), parseFloat(item.longitude)]} icon={createCustomIcon()}>
                            <Popup className="custom-popup" maxWidth={250}>
                                <div className="p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {(item.business_name || item.title)?.[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-foreground m-0 leading-tight truncate">
                                                {item.business_name || item.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                {item.rating && (
                                                    <div className="flex items-center">
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                        <span className="ml-1 text-xs font-bold">{item.rating}</span>
                                                    </div>
                                                )}
                                                {item.is_verified && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                                                {item.property_type && <span className="text-[10px] font-bold text-primary uppercase">{item.property_type}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-4">
                                        <MapPin className="w-3.5 h-3.5 opacity-70" />
                                        {item.city || item.location}
                                    </p>
                                    {mode === 'discovery' ? (
                                        <a href={route('property-managers.show', item.id)} className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all">
                                            View Profile <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    ) : (
                                        <div className="text-[10px] text-muted-foreground italic border-t border-border pt-2">Managed Portfolio Property</div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}

                {/* Overlays */}
                <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
                    <div className="bg-card/90 backdrop-blur-xl p-3 px-4 rounded-2xl border border-primary/20 shadow-xl max-w-[200px]">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{mode === 'discovery' ? 'Explorer' : 'Portfolio Map'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {mode === 'discovery' ? `Found ${items.length} professionals nearby.` : `Displaying ${items.length} managed properties.`}
                        </p>
                    </div>
                </div>
            </MapContainer>
        </div>
    );
}
