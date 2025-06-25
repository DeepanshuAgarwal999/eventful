'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    OnboardingProgress,
    BasicInfoStep,
    CategoriesLanguagesStep,
    PricingLocationStep,
    ProfileImageStep,
    OnboardingNavigation,
    onboardingSections,
    useArtistOnboarding,
} from './onboarding';

interface ArtistOnboardingFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

const ArtistOnboardingForm: React.FC<ArtistOnboardingFormProps> = ({
    onSuccess,
    onCancel
}) => {
    const {
        // Form state
        currentStep,
        imagePreview,
        progress,
        errors,
        isValid,
        createLoading,

        // Form data
        watchedGenres,
        watchedLanguages,
        watchedFeeRange,

        // Form methods
        register,
        handleSubmit,
        watch,

        // Handlers
        handleGenreChange,
        handleLanguageChange,
        handleFeeRangeChange,
        handleImageUpload,
        clearImage,
        nextStep,
        prevStep,
        onSubmit,
    } = useArtistOnboarding({ onSuccess });

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <BasicInfoStep
                        register={register}
                        errors={errors}
                        watch={watch}
                    />
                );
            case 1:
                return (
                    <CategoriesLanguagesStep
                        errors={errors}
                        watchedGenres={watchedGenres}
                        watchedLanguages={watchedLanguages}
                        handleGenreChange={handleGenreChange}
                        handleLanguageChange={handleLanguageChange}
                    />
                );
            case 2:
                return (
                    <PricingLocationStep
                        register={register}
                        errors={errors}
                        watchedFeeRange={watchedFeeRange}
                        handleFeeRangeChange={handleFeeRangeChange}
                    />
                );
            case 3:
                return (
                    <ProfileImageStep
                        imagePreview={imagePreview}
                        handleImageUpload={handleImageUpload}
                        clearImage={clearImage}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <OnboardingProgress
                        currentStep={currentStep}
                        sections={onboardingSections}
                        progress={progress}
                    />
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Step Content */}
                        <div className="min-h-[400px]">
                            {renderStepContent()}
                        </div>

                        {/* Navigation Buttons */}
                        <OnboardingNavigation
                            currentStep={currentStep}
                            totalSteps={onboardingSections.length}
                            onPrevStep={prevStep}
                            onNextStep={nextStep}
                            onCancel={onCancel}
                            onSubmit={handleSubmit(onSubmit)}
                            isValid={isValid}
                            isSubmitting={createLoading}
                            canGoToPrevious={currentStep > 0}
                        />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ArtistOnboardingForm;
