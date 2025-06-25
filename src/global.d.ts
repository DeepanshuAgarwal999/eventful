interface Artist {
  id: string;
  name: string;
  genres: string[];
  bio: string;
  image?: string;
  location: string;
  languages: string[];
  feeRange: string;
  price: number;
  rating: number;
  managerId: string;
  manager: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  // Legacy fields for backward compatibility
  genre: string;
  city: string;
}
