
export interface Artist {
  id: string;
  name: string;
  genre: string;
  genres: string[];
  bio: string;
  image?: string;
  city: string;
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
}

// Mock data - in a real app, this would fetch from a database
const mockArtists: Artist[] = [
  {
    id: "1",
    name: "The Electric Storm",
    genre: "ROCK",
    genres: ["ROCK", "POP"],
    bio: "High-energy rock band with 10+ years experience performing at festivals and corporate events",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    city: "Los Angeles",
    location: "Los Angeles, CA, USA",
    languages: ["ENGLISH", "SPANISH"],
    feeRange: "RANGE_2500_5000",
    price: 5000,
    rating: 4.8,
    managerId: "2",
    manager: {
      id: "2",
      name: "John Manager",
      email: "john@example.com"
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jazz Collective",
    genre: "JAZZ",
    genres: ["JAZZ", "CLASSICAL"],
    bio: "Smooth jazz ensemble perfect for corporate events, weddings, and intimate gatherings",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
    city: "New York",
    location: "New York, NY, USA",
    languages: ["ENGLISH", "FRENCH"],
    feeRange: "RANGE_2500_5000",
    price: 3500,
    rating: 4.9,
    managerId: "3",
    manager: {
      id: "3",
      name: "Sarah Manager",
      email: "sarah@example.com"
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Acoustic Dreams",
    genre: "FOLK",
    genres: ["FOLK", "POP"],
    bio: "Intimate acoustic performances for smaller venues and private events",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300",
    city: "Nashville",
    location: "Nashville, TN, USA",
    languages: ["ENGLISH"],
    feeRange: "RANGE_1000_2500",
    price: 2000,
    rating: 4.7,
    managerId: "4",
    manager: {
      id: "4",
      name: "Mike Manager",
      email: "mike@example.com"
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "DJ Vibes",
    genre: "ELECTRONIC",
    genres: ["ELECTRONIC", "DANCE"],
    bio: "Professional DJ specializing in electronic dance music for clubs and parties",
    image: "https://images.unsplash.com/photo-1571266028243-d220c9b3aed1?w=300",
    city: "Miami",
    location: "Miami, FL, USA",
    languages: ["ENGLISH", "SPANISH"],
    feeRange: "RANGE_1000_2500",
    price: 1500,
    rating: 4.6,
    managerId: "5",
    manager: {
      id: "5",
      name: "Alex Manager",
      email: "alex@example.com"
    },
    createdAt: new Date().toISOString(),
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Server-side function to get all artists (for getStaticProps)
export async function getAllArtists(): Promise<Artist[]> {
  // Simulate API call delay
  await delay(100);
  return mockArtists;
}

export async function getFeaturedArtists(limit: number = 4): Promise<Artist[]> {
  await delay(100);
  return mockArtists.slice(0, limit);
}

export async function getArtistsWithRealTimeData(): Promise<{
  artists: Artist[];
  totalCount: number;
  lastUpdated: string;
}> {
  await delay(150);
  
  // Simulate real-time data changes
  const artistsWithRealTimeData = mockArtists.map(artist => ({
    ...artist,
    // Simulate slight rating changes
    rating: Math.round((artist.rating + (Math.random() - 0.5) * 0.2) * 10) / 10,
  }));

  return {
    artists: artistsWithRealTimeData,
    totalCount: artistsWithRealTimeData.length,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getArtistStats(): Promise<{
  totalArtists: number;
  totalEvents: number;
  averageRating: number;
}> {
  await delay(50);
  
  const totalArtists = mockArtists.length;
  const averageRating = mockArtists.reduce((sum, artist) => sum + artist.rating, 0) / totalArtists;
  
  return {
    totalArtists: totalArtists * 125, 
    totalEvents: 1000,
    averageRating: Math.round(averageRating * 10) / 10,
  };
}
