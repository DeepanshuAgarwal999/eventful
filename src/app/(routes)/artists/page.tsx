'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { ArtistsQuery } from '@/graphql/queries/artists.query';
import ArtistCard from '@/components/global/artists/artist-card';
import ArtistFiltersComponent, { ArtistFilters } from '@/components/global/artists/artist-filters';
import Skeleton from '@/components/shared/skeleton';
import ErrorState from '@/components/shared/error-state';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, SortAsc } from 'lucide-react';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

const ArtistListingPage = () => {
    const { data, loading, error, refetch } = useQuery(ArtistsQuery.getArtistsQuery());

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const artists: Artist[] = data?.getArtists || [];

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
                artist.genre.toLowerCase().includes(filters.search.toLowerCase()) ||
                artist.city.toLowerCase().includes(filters.search.toLowerCase());

            const matchesGenre = !filters.genre || artist.genre === filters.genre;
            const matchesLocation = !filters.location || artist.city === filters.location;
            const matchesPrice = artist.price >= filters.priceRange[0] && artist.price <= filters.priceRange[1];

            return matchesSearch && matchesGenre && matchesLocation && matchesPrice;
        });

        // Sort artists
        switch (sortBy) {
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            default:
                break;
        }

        return filtered;
    }, [artists, filters, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedArtists.length / itemsPerPage);
    const paginatedArtists = filteredAndSortedArtists.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <Skeleton />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ErrorState
                    title="Error Loading Artists"
                    message={error.message}
                    onClick={() => refetch()}
                />
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Find Your Perfect Artist
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Browse through our curated collection of talented performers and find the perfect match for your event
                        </p>
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

                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {filteredAndSortedArtists.length} Artists Found
                        </h2>
                        <p className="text-gray-600">
                            Showing {Math.min(itemsPerPage, filteredAndSortedArtists.length)} of {filteredAndSortedArtists.length} results
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort Options */}
                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                            <SelectTrigger className="w-[180px]">
                                <SortAsc className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name (A-Z)</SelectItem>
                                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                                <SelectItem value="rating">Rating (High to Low)</SelectItem>
                                <SelectItem value="newest">Newest First</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* View Mode Toggle */}
                        <div className="flex border rounded-lg overflow-hidden">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                                className="rounded-none"
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                                className="rounded-none"
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Artists Grid/List */}
                {filteredAndSortedArtists.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artists Found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                        <Button onClick={() => setFilters({
                            search: '',
                            genre: '',
                            location: '',
                            priceRange: priceRange
                        })}>
                            Clear All Filters
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className={
                            viewMode === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "space-y-4"
                        }>
                            {paginatedArtists.map((artist) => (
                                <div key={artist.id} className={viewMode === 'list' ? 'max-w-none' : ''}>
                                    <ArtistCard artist={artist} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-2">
                                <Button
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    Previous
                                </Button>

                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setCurrentPage(pageNum)}
                                                className="w-10"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ArtistListingPage;
