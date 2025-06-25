'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface ArtistFilters {
    search: string;
    genre: string;
    location: string;
    priceRange: [number, number];
}

interface ArtistFiltersProps {
    filters: ArtistFilters;
    onFiltersChange: (filters: ArtistFilters) => void;
    availableGenres: string[];
    availableLocations: string[];
    priceRange: [number, number];
}

const ArtistFiltersComponent: React.FC<ArtistFiltersProps> = ({
    filters,
    onFiltersChange,
    availableGenres,
    availableLocations,
    priceRange
}) => {
    const updateFilters = (key: keyof ArtistFilters, value: any) => {
        onFiltersChange({ ...filters, [key]: value });
    };
    const clearAllFilters = () => {
        onFiltersChange({
            search: '',
            genre: '',
            location: '',
            priceRange: priceRange
        });
    };

    const hasActiveFilters = filters.search || filters.genre || filters.location ||
        (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]);

    const activeFilterCount = [
        filters.search,
        filters.genre,
        filters.location,
        (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1])
    ].filter(Boolean).length;

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-4 h-4 mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Search Artists</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search by name, genre, or location..."
                            value={filters.search}
                            onChange={(e) => updateFilters('search', e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">                    {/* Category Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <Select value={filters.genre || "all"} onValueChange={(value) => updateFilters('genre', value === "all" ? '' : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {availableGenres.map((genre) => (
                                    <SelectItem key={genre} value={genre}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <Select value={filters.location || "all"} onValueChange={(value) => updateFilters('location', value === "all" ? '' : value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                {availableLocations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                        {location}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                        </label>
                        <div className="px-2">
                            <Slider
                                min={priceRange[0]}
                                max={priceRange[1]}
                                step={50}
                                value={filters.priceRange}
                                onValueChange={(value) => updateFilters('priceRange', value as [number, number])}
                                className="w-full"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>
                </div>                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Active Filters:</label>
                        <div className="flex flex-wrap gap-2">
                            {filters.search && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    Search: {filters.search}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 ml-1 hover:bg-transparent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateFilters('search', '');
                                        }}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Badge>
                            )}
                            {filters.genre && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    Genre: {filters.genre}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 ml-1 hover:bg-transparent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateFilters('genre', '');
                                        }}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Badge>
                            )}
                            {filters.location && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    Location: {filters.location}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 ml-1 hover:bg-transparent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateFilters('location', '');
                                        }}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Badge>
                            )}
                            {(filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 ml-1 hover:bg-transparent"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateFilters('priceRange', priceRange);
                                        }}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ArtistFiltersComponent;
