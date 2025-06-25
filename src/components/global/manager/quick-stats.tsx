"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react";

interface QuickStatsProps {
    bookings: any[];
    artists: any[];
}

export function QuickStats({ bookings, artists }: QuickStatsProps) {
    const pendingBookings = bookings.filter(b => b.status === "PENDING").length;
    const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED").length;
    const totalRevenue = bookings
        .filter(b => b.status === "CONFIRMED")
        .reduce((sum, b) => sum + b.price, 0);

        const stats = [
            {
                title: "Total Artists",
                value: artists.length,
                icon: Users,
                description: "Artists under management",
                trend: "+2 this month"
            },
            {
                title: "Pending Requests",
                value: pendingBookings,
                icon: Clock,
                description: "Awaiting response",
                trend: pendingBookings > 0 ? "Requires attention" : "All caught up"
            },
            {
                title: "Confirmed Bookings",
                value: confirmedBookings,
                icon: CheckCircle,
                description: "This month",
                trend: "+25% from last month"
            },
            {
                title: "Total Revenue",
                value: `$${totalRevenue.toLocaleString()}`,
                icon: DollarSign,
                description: "Confirmed bookings",
                trend: "+12% from last month"
            }
        ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                            <Badge
                                variant={stat.title === "Pending Requests" && pendingBookings > 0 ? "destructive" : "secondary"}
                                className="mt-2"
                            >
                                {stat.trend}
                            </Badge>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
