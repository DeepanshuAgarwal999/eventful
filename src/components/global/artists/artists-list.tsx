'use client';

import { ArtistsQuery } from "@/graphql/queries/artists.query"
import { useQuery } from "@apollo/client"
import ArtistCard from "./artist-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Skeleton from "@/components/shared/skeleton";
import ErrorState from "@/components/shared/error-state";
import Link from "next/link";


const ArtistsList = () => {
    const { data, loading, error } = useQuery(ArtistsQuery.getArtistsQuery())

    if (loading) {
        return (
            <Skeleton />
        )
    }

    if (error) {
        return (
            <ErrorState title="Error" message={error.message} onClick={() => window.location.reload()} />
        )
    }
    const artists: Artist[] = data?.getArtists || []
    const featuredArtists = artists.slice(0, 4) // Show only first 4 artists

    return (
        <section className="py-16 bg-gray-50" id="artists">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Featured Artists
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover talented performers ready to make your event unforgettable
                    </p>
                </div>

                {/* Artists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuredArtists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))}
                </div>

                {/* View All Artists Button */}
                {artists.length > 4 && (
                    <div className="text-center">
                        <Link href={'/artists'}>
                            <Button size="lg" className="group">
                                View All Artists
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                )}

                {/* No Artists Message */}
                {artists.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎭</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artists Found</h3>
                        <p className="text-gray-600">Check back soon for amazing performers!</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ArtistsList