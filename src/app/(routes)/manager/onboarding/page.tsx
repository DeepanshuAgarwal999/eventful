"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ArtistsQuery } from "@/graphql/queries/artists.query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, User, Music, MapPin, DollarSign } from "lucide-react";
import ArtistOnboardingForm from "@/components/global/artists/artist-onboarding-form";

const ManagerOnboardingPage = () => {
    const router = useRouter();
    const [onboardingStep, setOnboardingStep] = useState<"intro" | "form" | "success">("intro");
    const [createArtist, { loading: createLoading }] = useMutation(ArtistsQuery.createArtistMutation());

    const handleStartOnboarding = () => {
        setOnboardingStep("form");
    };

    const handleSuccess = async () => {
        setOnboardingStep("success");
        // Redirect to manager dashboard after a brief success display
        setTimeout(() => {
            router.push("/manager");
        }, 2000);
    };

    const handleCancel = () => {
        if (onboardingStep === "form") {
            setOnboardingStep("intro");
        } else {
            router.push("/manager");
        }
    };

    const handleBackToManager = () => {
        router.push("/manager");
    };

    if (onboardingStep === "success") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <Card className="w-full max-w-md mx-4">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Artist Onboarded Successfully!</h2>
                            <p className="text-gray-600">
                                The new artist has been added to your roster and is now available for bookings.
                            </p>
                            <div className="pt-4">
                                <div className="animate-pulse text-sm text-gray-500">
                                    Redirecting to your dashboard...
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (onboardingStep === "form") {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Button
                                variant="ghost"
                                onClick={handleCancel}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <h1 className="text-lg font-semibold text-gray-900">
                                Onboard New Artist
                            </h1>
                            <div className="w-16" />
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="py-8">
                    <ArtistOnboardingForm
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Button
                            variant="ghost"
                            onClick={handleBackToManager}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <h1 className="text-lg font-semibold text-gray-900">
                            Artist Onboarding
                        </h1>
                        <div className="w-16" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Add a New Artist to Your Roster
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Help talented artists join our platform and start getting booked for amazing events
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Artist Profile</h3>
                                <p className="text-sm text-gray-600">Create a comprehensive profile showcasing their talents</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Music className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Showcase Skills</h3>
                                <p className="text-sm text-gray-600">Highlight genres, languages, and special abilities</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Set Location</h3>
                                <p className="text-sm text-gray-600">Define service areas and availability</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <DollarSign className="w-6 h-6 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold mb-2">Set Pricing</h3>
                                <p className="text-sm text-gray-600">Configure competitive rates and fee structure</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Manager Benefits */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Why Onboard Artists?</CardTitle>
                            <CardDescription>
                                Benefits of expanding your artist roster
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-medium">Increased Revenue</h4>
                                        <p className="text-sm text-gray-600">More artists mean more booking opportunities and higher earnings</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-medium">Diverse Portfolio</h4>
                                        <p className="text-sm text-gray-600">Offer clients a wider range of talent and entertainment options</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-medium">Market Coverage</h4>
                                        <p className="text-sm text-gray-600">Expand your reach across different genres and event types</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Call to Action */}
                    <div className="text-center">
                        <Button
                            onClick={handleStartOnboarding}
                            size="lg"
                            className="px-8 py-3 text-lg"
                        >
                            Start Onboarding Process
                        </Button>
                        <p className="text-sm text-gray-500 mt-3">
                            Takes about 5-10 minutes to complete
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerOnboardingPage;
