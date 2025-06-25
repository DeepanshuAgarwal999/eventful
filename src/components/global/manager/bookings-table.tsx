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
import { MoreHorizontal, Calendar, MapPin, User, DollarSign, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface BookingsTableProps {
    bookings: any[];
    onAction: (bookingId: string, status: string) => void;
}

export function BookingsTable({ bookings, onAction }: BookingsTableProps) {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    console.log({ bookings });
    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "CONFIRMED":
                return "bg-green-100 text-green-800 border-green-200";
            case "DECLINED":
                return "bg-red-100 text-red-800 border-red-200";
            case "CANCELLED":
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const handleViewDetails = (booking: any) => {
        setSelectedBooking(booking);
        setDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch {
            return dateString;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "h:mm a");
        } catch {
            return "";
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No booking requests yet</h3>
                <p className="text-muted-foreground">
                    Booking requests for your artists will appear here
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Artist</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium">{booking.eventName}</div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {booking.artist?.city || "Location TBD"}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={booking.artist?.image} />
                                            <AvatarFallback>
                                                {booking.artist?.name?.charAt(0) || "A"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{booking.artist?.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {booking.artist?.genre}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium">{booking.eventPlanner?.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {booking.eventPlanner?.company || booking.eventPlanner?.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium">{formatDate(booking.eventDate)}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {formatTime(booking.eventDate)}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-semibold">
                                        ${booking.price?.toLocaleString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={getStatusColor(booking.status)}
                                    >
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                                                View Details
                                            </DropdownMenuItem>
                                            {booking.status === "PENDING" && (
                                                <>
                                                    <DropdownMenuItem
                                                        onClick={() => onAction(booking.id, "CONFIRMED")}
                                                        className="text-green-600"
                                                    >
                                                        Accept Booking
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onAction(booking.id, "DECLINED")}
                                                        className="text-red-600"
                                                    >
                                                        Decline Booking
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                            {booking.status === "CONFIRMED" && (
                                                <DropdownMenuItem
                                                    onClick={() => onAction(booking.id, "CANCELLED")}
                                                    className="text-red-600"
                                                >
                                                    Cancel Booking
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Booking Details Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Booking Request Details</DialogTitle>
                        <DialogDescription>
                            Review and manage this booking request
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="space-y-6">
                            {/* Event Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Event Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Event Name</label>
                                            <p className="text-lg font-semibold">{selectedBooking.eventName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                                            <p className="text-lg">{formatDate(selectedBooking.eventDate)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Offered Amount</label>
                                            <p className="text-lg font-semibold text-green-600">
                                                ${selectedBooking.price?.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Status</label>
                                            <Badge className={getStatusColor(selectedBooking.status)}>
                                                {selectedBooking.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

    

                            {/* Message */}
                            {selectedBooking.message && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5" />
                                            Message from Client
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">{selectedBooking.message}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Actions */}
                            {selectedBooking.status === "PENDING" && (
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => {
                                            onAction(selectedBooking.id, "CONFIRMED");
                                            setDialogOpen(false);
                                        }}
                                        className="flex-1"
                                    >
                                        Accept Booking
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            onAction(selectedBooking.id, "DECLINED");
                                            setDialogOpen(false);
                                        }}
                                        className="flex-1"
                                    >
                                        Decline Booking
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
