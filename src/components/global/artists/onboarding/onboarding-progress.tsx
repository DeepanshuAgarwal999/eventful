'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

interface Section {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    fields: string[];
}

interface OnboardingProgressProps {
    currentStep: number;
    sections: Section[];
    progress: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
    currentStep,
    sections,
    progress,
}) => {
    return (
        <div className="space-y-4">
            {/* Header with step indicator */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Artist Onboarding</h2>
                <Badge variant="outline">
                    Step {currentStep + 1} of {sections.length}
                </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{sections[currentStep].title}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Step Navigation */}
            <div className="flex justify-between mt-4">
                {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                        <div
                            key={index}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${index === currentStep
                                    ? 'bg-blue-100 text-blue-700'
                                    : index < currentStep
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:block">
                                {section.title}
                            </span>
                            {index < currentStep && (
                                <Check className="w-4 h-4" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
