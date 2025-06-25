'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, MapPin, DollarSign, MessageSquare } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { BookingsQuery } from '@/graphql/queries/bookings.query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod schema for quote form validation
const quoteFormSchema = z.object({
    eventName: z.string().min(1, "Event name is required").max(100, "Event name is too long"),
    eventDate: z.string().min(1, "Event date is required"),
    message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message is too long")
})

type QuoteFormData = z.infer<typeof quoteFormSchema>

interface ArtistCardProps {
    artist: Artist
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    const [quoteDialogOpen, setQuoteDialogOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid } } = useForm<QuoteFormData>({
            resolver: zodResolver(quoteFormSchema),
            mode: 'onChange'
        }); const [createBooking, { loading: createBookingLoading }] = useMutation(
            BookingsQuery.createBookingMutation(),
            {
                refetchQueries: [
                    { query: BookingsQuery.getMyBookingsQuery() },
                    { query: BookingsQuery.getManagerBookingsQuery() }
                ]
            }
        )

    const handleQuoteRequest = () => {
        reset() // Reset form when opening dialog
        setQuoteDialogOpen(true)
    }

    const onSubmit = async (data: QuoteFormData) => {
        try {
            await createBooking({
                variables: {
                    input: {
                        artistId: artist.id,
                        eventName: data.eventName,
                        eventDate: data.eventDate,
                        price: artist.price || 0,
                        message: data.message
                    }
                }
            })
            setQuoteDialogOpen(false)
            reset() // Reset form after successful submission
            // Optional: Show success message
        } catch (error) {
            console.error("Error creating booking:", error)
        }
    }

    return (
        <>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                    {/* Artist Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden w-full max-h-[300px]">
                        {artist.image ? (
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-full  h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                                {artist.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{artist.rating.toFixed(1)}</span>
                        </div>

                        {/* Genre Badge */}
                        <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800">
                                {artist.genre}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg line-clamp-1">{artist.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600 gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{artist.city}</span>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{artist.bio}</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                <DollarSign className="w-4 h-4" />
                                <span>${artist.price}/event</span>
                            </div>                        <Button
                                size="sm"
                                className="flex-1 group-hover:shadow-md w-full"
                                onClick={handleQuoteRequest}
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask for Quote
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>            {/* Quote Request Dialog */}
            <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Request Quote</DialogTitle>
                        <DialogDescription>
                            Send a booking request to {artist.name}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="eventName">Event Name *</Label>
                            <Input
                                id="eventName"
                                {...register("eventName")}
                                placeholder="e.g., Wedding Reception, Corporate Event"
                            />
                            {errors.eventName && (
                                <p className="text-sm text-red-500 mt-1">{errors.eventName.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="eventDate">Event Date *</Label>
                            <Input
                                id="eventDate"
                                type="date"
                                {...register("eventDate")}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.eventDate && (
                                <p className="text-sm text-red-500 mt-1">{errors.eventDate.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                                id="message"
                                {...register("message")}
                                placeholder="Tell the artist about your event requirements..."
                                rows={4}
                            />
                            {errors.message && (
                                <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setQuoteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={createBookingLoading || !isValid}
                            >
                                {createBookingLoading ? "Sending..." : "Send Request"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ArtistCard
