'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ProfileImageStepProps {
    imagePreview: string | null;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearImage: () => void;
}

export const ProfileImageStep: React.FC<ProfileImageStepProps> = ({
    imagePreview,
    handleImageUpload,
    clearImage,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label>Profile Image (Optional)</Label>

                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    {imagePreview ? (
                        <div className="space-y-4">
                            <div className="relative w-32 h-32 mx-auto">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                                    onClick={clearImage}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600">Click the X to remove image</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                            <div>
                                <Label
                                    htmlFor="image-upload"
                                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                                >
                                    Click to upload an image
                                </Label>
                                <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500">
                                PNG, JPG up to 10MB. A professional headshot works best.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
