'use client';

import React, { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { getArtistsWithRealTimeData, Artist } from '@/lib/artists-api';
import ArtistCard from '@/components/global/artists/artist-card';
import ArtistFiltersComponent, { ArtistFilters } from '@/components/global/artists/artist-filters';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, SortAsc, RefreshCw } from 'lucide-react';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

interface ArtistListingPageProps {
    artists: Artist[];
    totalCount: number;
    lastUpdated: string;
}

const ArtistListingPage = ({ artists: initialArtists, totalCount, lastUpdated }: ArtistListingPageProps) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const artists: Artist[] = initialArtists || [];

    // Extract unique values for filters
    const availableGenres = useMemo(() => {
        return Array.from(new Set(artists.map(artist => artist.genre))).sort();
    }, [artists]);

    const availableLocations = useMemo(() => {
        return Array.from(new Set(artists.map(artist => artist.city))).sort();
    }, [artists]);

    const priceRange = useMemo(() => {
        if (artists.length === 0) return [0, 1000] as [number, number];
        const prices = artists.map(artist => artist.price);
        return [Math.min(...prices), Math.max(...prices)] as [number, number];
    }, [artists]);

    const [filters, setFilters] = useState<ArtistFilters>({
        search: '',
        genre: '',
        location: '',
        priceRange: priceRange
    });

    // Update filters when data loads
    React.useEffect(() => {
        if (artists.length > 0) {
            setFilters(prev => ({
                ...prev,
                priceRange: priceRange
            }));
        }
    }, [priceRange]);

    // Filter and sort artists
    const filteredAndSortedArtists = useMemo(() => {
        let filtered = artists.filter(artist => {
            const matchesSearch = !filters.search ||
                artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                artist.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
                artist.genre.toLowerCase().includes(filters.search.toLowerCase());

            const matchesGenre = !filters.genre || artist.genre === filters.genre;
            const matchesLocation = !filters.location || artist.city === filters.location;
            const matchesPrice = artist.price >= filters.priceRange[0] && artist.price <= filters.priceRange[1];

            return matchesSearch && matchesGenre && matchesLocation && matchesPrice;
        });

        // Sort artists
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

        return filtered;
    }, [artists, filters, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedArtists.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArtists = filteredAndSortedArtists.slice(startIndex, endIndex);

    // Update current page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy]);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Find Your Perfect Artist
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                            Browse through our curated collection of talented performers and find the perfect match for your event
                        </p>

                        {/* Real-time data indicator */}
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRefresh}
                                className="h-8 px-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <ArtistFiltersComponent
                    filters={filters}
                    onFiltersChange={setFilters}
                    availableGenres={availableGenres}
                    availableLocations={availableLocations}
                    priceRange={priceRange}
                />

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {filteredAndSortedArtists.length} of {totalCount} artists
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort Options */}
                        <div className="flex items-center gap-2">
                            <SortAsc className="w-4 h-4 text-gray-500" />
                            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name (A-Z)</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center border rounded-lg p-1">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                                className="h-8 w-8 p-0"
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                                className="h-8 w-8 p-0"
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Artists Grid/List */}
                {paginatedArtists.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                            : "space-y-4 mb-8"
                    }>
                        {paginatedArtists.map((artist) => (
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎭</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artists Found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your filters to find more artists.</p>
                        <Button onClick={() => setFilters({
                            search: '',
                            genre: '',
                            location: '',
                            priceRange: priceRange
                        })}>
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                                if (pageNum > totalPages) return null;

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={pageNum === currentPage ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(pageNum)}
                                        className="w-8 h-8 p-0"
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Get server-side props for real-time data
export const getServerSideProps: GetServerSideProps<ArtistListingPageProps> = async (context) => {
    try {
        // This runs on every request, providing real-time data
        const data = await getArtistsWithRealTimeData();

        return {
            props: {
                artists: data.artists,
                totalCount: data.totalCount,
                lastUpdated: data.lastUpdated,
            },
        };
    } catch (error) {
        console.error('Error fetching artists data:', error);

        // Return empty data on error
        return {
            props: {
                artists: [],
                totalCount: 0,
                lastUpdated: new Date().toISOString(),
            },
        };
    }
};

export default ArtistListingPage;
