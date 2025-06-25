"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    MoreHorizontal,
    Star,
    MapPin,
    Users,
    Eye,
    Plus,
    MessageSquare,

} from "lucide-react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { BookingsQuery } from "@/graphql/queries/bookings.query";

interface ArtistsTableProps {
    artists: any[];
    onRefresh: () => void;
}

export function ArtistsTable({ artists, onRefresh }: ArtistsTableProps) {
    const [selectedArtist, setSelectedArtist] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
    const [quoteForm, setQuoteForm] = useState({
        eventName: "",
        eventDate: "",
        message: "",
        expectedPrice: ""
    });
    const [createBooking, { loading: createBookingLoading }] = useMutation(
        BookingsQuery.createBookingMutation(),
        {
            refetchQueries: [{ query: BookingsQuery.getManagerBookingsQuery() }],
        }
    );

    const handleViewDetails = (artist: any) => {
        setSelectedArtist(artist);
        setDialogOpen(true);
    };

    const handleQuoteRequest = (artist: any) => {
        setSelectedArtist(artist);
        setQuoteForm({
            eventName: "",
            eventDate: "",
            message: "",
            expectedPrice: artist.price?.toString() || ""
        });
        setQuoteDialogOpen(true);
    };

    const handleSubmitQuote = async () => {
        if (!selectedArtist || !quoteForm.eventName || !quoteForm.eventDate || !quoteForm.message) {
            return;
        }

        try {
            await createBooking({
                variables: {
                    input: {
                        artistId: selectedArtist.id,
                        eventName: quoteForm.eventName,
                        eventDate: quoteForm.eventDate,
                        price: parseFloat(quoteForm.expectedPrice) || selectedArtist.price || 0,
                        message: quoteForm.message
                    }
                }
            });
            setQuoteDialogOpen(false);
            setQuoteForm({
                eventName: "",
                eventDate: "",
                message: "",
                expectedPrice: ""
            });
            onRefresh();
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };


    const formatPriceRange = (feeRange: any) => {
        if (typeof feeRange === 'string') {
            return feeRange;
        }
        if (feeRange?.min && feeRange?.max) {
            return `$${feeRange.min.toLocaleString()} - $${feeRange.max.toLocaleString()}`;
        }
        return "Price on request";
    };



    if (artists.length === 0) {
        return (
            <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No artists in your roster</h3>
                <p className="text-muted-foreground mb-4">
                    Start by onboarding your first artist
                </p>        <Button asChild>
                    <Link href="/manager/onboarding" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Onboard Artist
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Artist</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Price Range</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {artists.map((artist) => (
                            <TableRow key={artist.id}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={artist.image} />
                                            <AvatarFallback>
                                                {artist.name?.charAt(0) || "A"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{artist.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {artist.languages?.join(", ") || "Multiple languages"}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <Badge variant="outline">{artist.genre}</Badge>
                                        {artist.genres && artist.genres.length > 1 && (
                                            <div className="text-xs text-muted-foreground">
                                                +{artist.genres.length - 1} more
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3 text-muted-foreground" />
                                        <span>{artist.city || artist.location || "Location TBD"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-medium">{artist.rating || "New"}</span>
                                        {artist.rating && (
                                            <span className="text-sm text-muted-foreground">/5.0</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">
                                        {formatPriceRange(artist.feeRange || artist.price)}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleViewDetails(artist)}>
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Profile
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Artist Details Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Artist Profile</DialogTitle>
                        <DialogDescription>
                            View and manage artist information
                        </DialogDescription>
                    </DialogHeader>

                    {selectedArtist && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={selectedArtist.image} />
                                            <AvatarFallback>
                                                {selectedArtist.name?.charAt(0) || "A"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold">{selectedArtist.name}</h3>
                                            <p className="text-muted-foreground">{selectedArtist.genre}</p>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Location</label>
                                            <p className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {selectedArtist.city || selectedArtist.location || "Not specified"}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                            <p className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                {selectedArtist.rating || "New artist"}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Languages</label>
                                            <p>{selectedArtist.languages?.join(", ") || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Price Range</label>
                                            <p className="font-semibold text-green-600">
                                                {formatPriceRange(selectedArtist.feeRange || selectedArtist.price)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bio */}
                            {selectedArtist.bio && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Biography</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{selectedArtist.bio}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Genres */}
                            {selectedArtist.genres && selectedArtist.genres.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Genres & Specialties</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedArtist.genres.map((genre: string, index: number) => (
                                                <Badge key={index} variant="outline">
                                                    {genre}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}                            {/* Actions */}
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1"
                                    onClick={() => handleQuoteRequest(selectedArtist)}
                                >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Ask for Quote
                                </Button>

                            </div>
                        </div>)}
                </DialogContent>
            </Dialog>

            {/* Quote Request Dialog */}
            <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Request Quote</DialogTitle>
                        <DialogDescription>
                            Send a booking request to {selectedArtist?.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="eventName">Event Name *</Label>
                            <Input
                                id="eventName"
                                value={quoteForm.eventName}
                                onChange={(e) => setQuoteForm(prev => ({ ...prev, eventName: e.target.value }))}
                                placeholder="e.g., Wedding Reception, Corporate Event"
                            />
                        </div>

                        <div>
                            <Label htmlFor="eventDate">Event Date *</Label>
                            <Input
                                id="eventDate"
                                type="date"
                                value={quoteForm.eventDate}
                                onChange={(e) => setQuoteForm(prev => ({ ...prev, eventDate: e.target.value }))}
                            />
                        </div>

                        <div>
                            <Label htmlFor="expectedPrice">Expected Budget</Label>
                            <Input
                                id="expectedPrice"
                                type="number"
                                value={quoteForm.expectedPrice}
                                onChange={(e) => setQuoteForm(prev => ({ ...prev, expectedPrice: e.target.value }))}
                                placeholder={`Suggested: $${selectedArtist?.price || 0}`}
                            />
                        </div>

                        <div>
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                                id="message"
                                value={quoteForm.message}
                                onChange={(e) => setQuoteForm(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Tell the artist about your event requirements..."
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setQuoteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={handleSubmitQuote}
                                disabled={createBookingLoading || !quoteForm.eventName || !quoteForm.eventDate || !quoteForm.message}
                            >
                                {createBookingLoading ? "Sending..." : "Send Request"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
