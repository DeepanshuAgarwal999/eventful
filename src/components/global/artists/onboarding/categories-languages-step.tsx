'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { GENRES, LANGUAGES } from '@/constants/onboarding';

interface CategoriesLanguagesStepProps {
    errors: FieldErrors;
    watchedGenres: string[];
    watchedLanguages: string[];
    handleGenreChange: (genre: string, checked: boolean) => void;
    handleLanguageChange: (language: string, checked: boolean) => void;
}

export const CategoriesLanguagesStep: React.FC<CategoriesLanguagesStepProps> = ({
    errors,
    watchedGenres,
    watchedLanguages,
    handleGenreChange,
    handleLanguageChange,
}) => {
    return (
        <div className="space-y-6">
            {/* Categories */}
            <div className="space-y-3">
                <Label>Categories * (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {GENRES.map((genre) => (
                        <div key={genre.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={genre.value}
                                checked={watchedGenres.includes(genre.value)}
                                onCheckedChange={(checked) =>
                                    handleGenreChange(genre.value, checked as boolean)
                                }
                            />
                            <Label
                                htmlFor={genre.value}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {genre.label}
                            </Label>
                        </div>
                    ))}                </div>
                {errors.genres && (
                    <p className="text-sm text-red-600">{errors.genres.message as string}</p>
                )}
                {watchedGenres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {watchedGenres.map((genre) => (
                            <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                                {GENRES.find(g => g.value === genre)?.label}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => handleGenreChange(genre, false)}
                                />
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Languages */}
            <div className="space-y-3">
                <Label>Languages Spoken * (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {LANGUAGES.map((language) => (
                        <div key={language.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={language.value}
                                checked={watchedLanguages.includes(language.value)}
                                onCheckedChange={(checked) =>
                                    handleLanguageChange(language.value, checked as boolean)
                                }
                            />
                            <Label
                                htmlFor={language.value}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {language.label}
                            </Label>
                        </div>
                    ))}                </div>
                {errors.languages && (
                    <p className="text-sm text-red-600">{errors.languages.message as string}</p>
                )}
                {watchedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {watchedLanguages.map((language) => (
                            <Badge key={language} variant="secondary" className="flex items-center gap-1">
                                {LANGUAGES.find(l => l.value === language)?.label}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => handleLanguageChange(language, false)}
                                />
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
