"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface RecentActivityProps {
    bookings: any[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-800";
        case "CONFIRMED":
            return "bg-green-100 text-green-800";
        case "DECLINED":
            return "bg-red-100 text-red-800";
        case "CANCELLED":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export function RecentActivity({ bookings }: RecentActivityProps) {

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd");
        } catch {
            return dateString;
        }
    };

    const getTimeAgo = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

            if (diffHours < 1) return "Just now";
            if (diffHours < 24) return `${diffHours}h ago`;
            const diffDays = Math.floor(diffHours / 24);
            if (diffDays < 7) return `${diffDays}d ago`;
            return format(date, "MMM dd");
        } catch {
            return "Recently";
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="text-center py-6">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking, index) => (
                <div key={booking.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.artist?.image} />
                        <AvatarFallback>
                            {booking.artist?.name?.charAt(0) || "A"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                                New booking request for <span className="font-semibold">{booking.artist?.name}</span>
                            </p>
                            <Badge variant="outline" className={`text-xs ${getStatusColor(booking.status)}`}>
                                {booking.status}
                            </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {booking.eventName}
                            </span>
                            <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${booking.price?.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                                Event date: {formatDate(booking.eventDate)}
                            </p>
                            <span className="text-xs text-muted-foreground">
                                {getTimeAgo(booking.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {bookings.length > 0 && (
                <Button variant="outline" className="w-full" size="sm">
                    View All Activity
                </Button>
            )}
        </div>
    );
}
