'use client';

import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BasicInfoStepProps {
    register: any;
    errors: FieldErrors;
    watch: any;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
    register,
    errors,
    watch,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Artist Name *</Label>
                <Input
                    id="name"
                    placeholder="Enter your stage name or real name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''} />
                {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message as string}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                    rows={5}
                    {...register('bio')}
                    className={errors.bio ? 'border-red-500' : ''} />
                {errors.bio && (
                    <p className="text-sm text-red-600">{errors.bio.message as string}</p>
                )}
                <p className="text-sm text-gray-500">
                    {watch('bio')?.length || 0}/1000 characters
                </p>
            </div>
        </div>
    );
};
