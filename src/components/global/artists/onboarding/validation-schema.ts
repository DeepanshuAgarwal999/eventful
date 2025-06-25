import { z } from "zod";

// Validation Schema
export const artistOnboardingSchema = z.object({
  // Basic Information
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters").max(1000, "Bio must not exceed 1000 characters"),

  // Categories (multi-select)
  genres: z.array(z.string()).min(1, "Please select at least one category"),

  // Languages (multi-select)
  languages: z.array(z.string()).min(1, "Please select at least one language"),

  // Fee Range
  feeRange: z.string().min(1, "Please select a fee range"),

  // Location
  location: z.string().min(2, "Location must be at least 2 characters").max(100, "Location must not exceed 100 characters"),

  // Profile Image (optional)
  image: z.string().optional(),

  // Price for legacy compatibility
  price: z.number().min(0, "Price must be positive"),
});

export type ArtistOnboardingFormData = z.infer<typeof artistOnboardingSchema>;
