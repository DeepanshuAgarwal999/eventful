"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { ArtistsQuery } from "@/graphql/queries/artists.query";
import { artistOnboardingSchema, type ArtistOnboardingFormData, onboardingSections } from "../components/global/artists/onboarding/index";

interface UseArtistOnboardingProps {
  onSuccess?: () => void;
}

export const useArtistOnboarding = ({ onSuccess }: UseArtistOnboardingProps = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createArtist, { loading: createLoading }] = useMutation(ArtistsQuery.createArtistMutation(), {
    refetchQueries: [{ query: ArtistsQuery.getArtistsQuery() }],
  });

  const form = useForm<ArtistOnboardingFormData>({
    resolver: zodResolver(artistOnboardingSchema),
    defaultValues: {
      genres: [],
      languages: [],
      feeRange: "",
      price: 0,
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = form;

  const watchedGenres = watch("genres") || [];
  const watchedLanguages = watch("languages") || [];
  const watchedFeeRange = watch("feeRange");

  // Calculate progress
  const progress = ((currentStep + 1) / onboardingSections.length) * 100;

  // Handle genre selection
  const handleGenreChange = (genre: string, checked: boolean) => {
    const currentGenres = watchedGenres;
    if (checked) {
      setValue("genres", [...currentGenres, genre], { shouldValidate: true });
    } else {
      setValue(
        "genres",
        currentGenres.filter((g) => g !== genre),
        { shouldValidate: true }
      );
    }
  };

  // Handle language selection
  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = watchedLanguages;
    if (checked) {
      setValue("languages", [...currentLanguages, language], { shouldValidate: true });
    } else {
      setValue(
        "languages",
        currentLanguages.filter((l) => l !== language),
        { shouldValidate: true }
      );
    }
  };

  // Handle fee range change
  const handleFeeRangeChange = (value: string) => {
    setValue("feeRange", value, { shouldValidate: true });

    // Set price based on fee range for legacy compatibility
    const priceMap: Record<string, number> = {
      UNDER_500: 250,
      RANGE_500_1000: 750,
      RANGE_1000_2500: 1750,
      RANGE_2500_5000: 3750,
      RANGE_5000_10000: 7500,
      OVER_10000: 15000,
    };
    setValue("price", priceMap[value] || 0);
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue("image", result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear image
  const clearImage = () => {
    setImagePreview(null);
    setValue("image", "", { shouldValidate: true });
  };

  // Navigation functions
  const nextStep = async () => {
    const currentFields = onboardingSections[currentStep].fields;
    const isStepValid = await trigger(currentFields as any);

    if (isStepValid && currentStep < onboardingSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Form submission
  const onSubmit = async (data: ArtistOnboardingFormData) => {
    try {
      const result = await createArtist({
        variables: {
          input: {
            name: data.name,
            genres: data.genres,
            bio: data.bio,
            image: data.image || null,
            location: data.location,
            languages: data.languages,
            feeRange: data.feeRange,
            price: data.price,
          },
        },
      });

      if (result.data?.createArtist) {
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error creating artist:", error);
      // You might want to show an error message to the user here
    }
  };

  return {
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
  };
};
