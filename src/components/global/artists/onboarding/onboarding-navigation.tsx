'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface OnboardingNavigationProps {
    currentStep: number;
    totalSteps: number;
    onPrevStep: () => void;
    onNextStep: () => void;
    onCancel?: () => void;
    onSubmit: () => void;
    isValid: boolean;
    isSubmitting: boolean;
    canGoToPrevious: boolean;
}

export const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
    currentStep,
    totalSteps,
    onPrevStep,
    onNextStep,
    onCancel,
    onSubmit,
    isValid,
    isSubmitting,
    canGoToPrevious,
}) => {
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <div className="flex justify-between pt-6 border-t">
            <div className="flex space-x-2">
                {canGoToPrevious && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onPrevStep}
                        className="flex items-center"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                    </Button>
                )}
                {onCancel && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>

            <div className="flex space-x-2">
                {isLastStep ? (
                    <Button
                        type="button"
                        onClick={onSubmit}
                        className="flex items-center"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Complete Registration'}
                        <Check className="w-4 h-4 ml-1" />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        onClick={onNextStep}
                        className="flex items-center"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                )}
            </div>
        </div>
    );
};
