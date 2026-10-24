import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const CHENNAI_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.6477945823717!2d80.23509367507762!3d13.040105587281628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665409d1c93d%3A0x63741c4fe929f692!2s26RQ%2B33P%2C%205%2F9%2C%20Deena%20Dayalu%20St%2C%20Pondy%20Bazaar%2C%20T.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu%20600017!5e1!3m2!1sen!2sin!4v1779281712721!5m2!1sen!2sin";
const CHENNAI_EXTERNAL_MAP_URL = "https://maps.google.com/?q=5/9,+Deena+Dayalu+St,+Pondy+Bazaar,+T.+Nagar,+Chennai,+Tamil+Nadu+600017";

export function InteractiveMap({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const timeoutRef = useRef(null);
    const mapButtonRef = useRef(null);
    const closeButtonRef = useRef(null);

    const handleOpen = () => {
        setIsOpen(true);
        setHasLoadedOnce(true);
        setLoadError(false);
        setIsLoading(true);

        // Safeguard timeout in case iframe fails or gets blocked
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
        }, 8000);
    };

    const handleClose = () => {
        setIsOpen(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Return focus to map button for accessibility
        setTimeout(() => {
            mapButtonRef.current?.focus();
        }, 100);
    };

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            // Focus close button on open
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 150);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleIframeLoad = () => {
        setIsLoading(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleRetry = () => {
        setLoadError(false);
        setIsLoading(true);
    };

    return (
        <div className={cn("w-full transition-all duration-300", className)}>
            {/* Initial Collapsed State: Compact Map View Button */}
            {!isOpen ? (
                <button
                    ref={mapButtonRef}
                    type="button"
                    onClick={handleOpen}
                    className="group flex items-center justify-between w-full p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 hover:bg-[var(--bg-card)] hover:border-[#2AB182]/60 focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none transition-all duration-200 cursor-pointer"
                    aria-expanded="false"
                    aria-label="Open interactive map view of Chennai HQ"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2AB182]/10 border border-[#2AB182]/30 flex items-center justify-center text-[#2AB182] group-hover:bg-[#2AB182] group-hover:text-black transition-all duration-200">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block font-display font-bold text-sm tracking-wider uppercase text-[var(--text-primary)] group-hover:text-[#2AB182] transition-colors">
                                Map View
                            </span>
                            <span className="block font-body text-xs text-[var(--text-muted)]">
                                Click to explore interactive office map
                            </span>
                        </div>
                    </div>
                    <span className="px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider bg-[#2AB182]/15 text-[#2AB182] border border-[#2AB182]/30 rounded-md group-hover:bg-[#2AB182] group-hover:text-black transition-all duration-200">
                        View
                    </span>
                </button>
            ) : (
                /* Expanded State: Smooth Interactive Map Container */
                <div
                    className="relative w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-2xl transition-all duration-300 animate-fade-in"
                    role="region"
                    aria-label="Interactive Map View"
                >
                    {/* Top Action Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)] backdrop-blur-sm z-10 relative">
                        <div className="flex items-center gap-2 text-xs font-body text-[var(--text-primary)]">
                            <MapPin className="w-4 h-4 text-[#2AB182] shrink-0" />
                            <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">
                                Pondy Bazaar, T. Nagar, Chennai
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={CHENNAI_EXTERNAL_MAP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-body text-[var(--text-muted)] hover:text-[#2AB182] border border-[var(--border-subtle)] hover:border-[#2AB182]/40 rounded-md transition-colors"
                                title="Open in Google Maps"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Directions</span>
                            </a>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                onClick={handleClose}
                                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-body font-bold text-[var(--text-primary)] hover:text-black bg-white/5 hover:bg-[#2AB182] border border-[var(--border-subtle)] hover:border-[#2AB182] rounded-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#2AB182] focus-visible:outline-none cursor-pointer"
                                aria-label="Close Map View"
                            >
                                <X className="w-4 h-4" />
                                <span>Close</span>
                            </button>
                        </div>
                    </div>

                    {/* Map Frame Container */}
                    <div className="relative w-full h-[320px] sm:h-[360px] bg-[var(--bg-primary)]">
                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--bg-primary)]/90 backdrop-blur-sm transition-opacity duration-200">
                                <div className="w-8 h-8 border-2 border-[#2AB182] border-t-transparent rounded-full animate-spin mb-3"></div>
                                <span className="font-body text-xs text-[var(--text-muted)] tracking-wider uppercase font-semibold">
                                    Loading Chennai HQ Map...
                                </span>
                            </div>
                        )}

                        {/* Error Fallback */}
                        {loadError ? (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-[var(--bg-primary)]">
                                <MapPin className="w-8 h-8 text-[#2AB182] mb-3" />
                                <p className="font-body text-sm text-[var(--text-primary)] font-semibold mb-2">
                                    Unable to load embedded map
                                </p>
                                <p className="font-body text-xs text-[var(--text-muted)] mb-4 max-w-xs">
                                    5/9, Deena Dayalu St, Pondy Bazaar, T. Nagar, Chennai, Tamil Nadu 600017
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleRetry}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#2AB182] rounded-md"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        Retry
                                    </button>
                                    <a
                                        href={CHENNAI_EXTERNAL_MAP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body bg-[#2AB182] text-black font-bold rounded-md"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Open Google Maps
                                    </a>
                                </div>
                            </div>
                        ) : null}

                        {/* Interactive Google Map iframe */}
                        {hasLoadedOnce && (
                            <iframe
                                src={CHENNAI_MAP_EMBED_URL}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Invictus Chennai HQ Location"
                                onLoad={handleIframeLoad}
                                onError={() => {
                                    setIsLoading(false);
                                    setLoadError(true);
                                }}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default InteractiveMap;
