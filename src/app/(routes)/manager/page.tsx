"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BookingsQuery } from "@/graphql/queries/bookings.query";
import { ArtistsQuery } from "@/graphql/queries/artists.query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, TrendingUp, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { QuickStats } from "@/components/global/manager/quick-stats";
import { BookingsTable } from "@/components/global/manager/bookings-table";
import { RecentActivity } from "@/components/global/manager/recent-activity";
import { ArtistsTable } from "@/components/global/manager/artists-table";

export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    const { data: bookingsData, loading: bookingsLoading, refetch: refetchBookings } = useQuery(
        BookingsQuery.getManagerBookingsQuery()
    );
    const { data: artistsData, loading: artistsLoading, refetch: refetchArtists } = useQuery(
        ArtistsQuery.getArtistsQuery()
    );

    const [updateBookingStatus] = useMutation(BookingsQuery.updateBookingStatusMutation());
    // Get all bookings (no manager filtering)
    const managerBookings = bookingsData?.getBookings || [];

    // Get all artists (no manager filtering)
    const managerArtists = artistsData?.getArtists || [];

    const handleBookingAction = async (bookingId: string, status: string) => {
        try {
            await updateBookingStatus({
                variables: { id: bookingId, status }
            });
            refetchBookings();
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    };

    if (bookingsLoading || artistsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage your artists and booking requests
                    </p>
                </div>
                <Button asChild>
                    <Link href="/manager/onboarding" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Onboard New Artist
                    </Link>
                </Button>
            </div>

            {/* Quick Stats */}
            <QuickStats bookings={managerBookings} artists={managerArtists} />

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
                    <TabsTrigger value="artists">My Artists</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Booking Requests</CardTitle>
                                <CardDescription>
                                    Latest booking requests for your artists
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentActivity bookings={managerBookings.slice(0, 5)} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Common tasks and shortcuts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/manager/onboarding">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Onboard New Artist
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <CalendarDays className="h-4 w-4 mr-2" />
                                    View Calendar
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Performance Reports
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="bookings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Requests</CardTitle>
                            <CardDescription>
                                Manage incoming booking requests for your artists
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BookingsTable
                                bookings={managerBookings}
                                onAction={handleBookingAction}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="artists" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Artists</CardTitle>
                            <CardDescription>
                                Manage your artist roster and their profiles
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ArtistsTable
                                artists={managerArtists}
                                onRefresh={refetchArtists}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Overview</CardTitle>
                                <CardDescription>
                                    Track earnings from confirmed bookings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ${managerBookings
                                        .filter((b: any) => b.status === "CONFIRMED")
                                        .reduce((sum: number, b: any) => sum + b.price, 0)
                                        .toLocaleString()}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Total confirmed bookings value
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Conversion Rate</CardTitle>
                                <CardDescription>
                                    Success rate of booking requests
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {managerBookings.length > 0
                                        ? Math.round(
                                            (managerBookings.filter((b: any) => b.status === "CONFIRMED").length /
                                                managerBookings.length) * 100
                                        )
                                        : 0}%
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Confirmed vs total requests
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
