'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FEE_RANGES } from '@/constants/onboarding';



interface PricingLocationStepProps {
    register: any;
    errors: FieldErrors;
    watchedFeeRange: string;
    handleFeeRangeChange: (value: string) => void;
}

export const PricingLocationStep: React.FC<PricingLocationStepProps> = ({
    register,
    errors,
    watchedFeeRange,
    handleFeeRangeChange,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Fee Range *</Label>
                <Select value={watchedFeeRange} onValueChange={handleFeeRangeChange}>
                    <SelectTrigger className={errors.feeRange ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your typical fee range" />
                    </SelectTrigger>
                    <SelectContent>
                        {FEE_RANGES.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>                </Select>
                {errors.feeRange && (
                    <p className="text-sm text-red-600">{errors.feeRange.message as string}</p>
                )}
                <p className="text-sm text-gray-500">
                    This helps clients understand your pricing tier
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                    id="location"
                    placeholder="City, State/Province, Country"
                    {...register('location')}
                    className={errors.location ? 'border-red-500' : ''} />
                {errors.location && (
                    <p className="text-sm text-red-600">{errors.location.message as string}</p>
                )}
                <p className="text-sm text-gray-500">
                    Where are you primarily based? This helps with local bookings.
                </p>
            </div>
        </div>
    );
};
