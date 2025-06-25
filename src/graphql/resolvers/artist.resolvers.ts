// Mock data for artists
export const mockArtists = [
  {
    id: "1",
    name: "The Electric Storm",
    genre: "ROCK", // Legacy field
    genres: ["ROCK", "POP"],
    bio: "High-energy rock band with 10+ years experience performing at festivals and corporate events",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    city: "Los Angeles", // Legacy field
    location: "Los Angeles, CA, USA",
    languages: ["ENGLISH", "SPANISH"],
    feeRange: "RANGE_2500_5000",
    price: 5000,
    rating: 4.8,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jazz Collective",
    genre: "JAZZ", // Legacy field
    genres: ["JAZZ", "CLASSICAL"],
    bio: "Smooth jazz ensemble perfect for corporate events, weddings, and intimate gatherings",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
    city: "New York", // Legacy field
    location: "New York, NY, USA",
    languages: ["ENGLISH", "FRENCH"],
    feeRange: "RANGE_2500_5000",
    price: 3500,
    rating: 4.9,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "DJ Luna",
    genre: "ELECTRONIC", // Legacy field
    genres: ["ELECTRONIC", "HIPHOP"],
    bio: "Electronic music producer and DJ specializing in club music and festival performances",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
    city: "Miami", // Legacy field
    location: "Miami, FL, USA",
    languages: ["ENGLISH", "SPANISH", "PORTUGUESE"],
    feeRange: "RANGE_1000_2500",
    price: 2500,
    rating: 4.7,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Comedy Central Mike",
    genre: "COMEDY", // Legacy field
    genres: ["COMEDY"],
    bio: "Stand-up comedian with clean humor perfect for corporate events and family gatherings",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    city: "Chicago", // Legacy field
    location: "Chicago, IL, USA",
    languages: ["ENGLISH"],
    feeRange: "RANGE_500_1000",
    price: 750,
    rating: 4.6,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "The Magic Touch",
    genre: "MAGIC", // Legacy field
    genres: ["MAGIC", "COMEDY"],
    bio: "Professional magician specializing in close-up magic and stage illusions for all ages",
    image: "https://images.unsplash.com/photo-1�435527173128-983b87201f4d?w=300",
    city: "Las Vegas", // Legacy field
    location: "Las Vegas, NV, USA",
    languages: ["ENGLISH", "SPANISH"],
    feeRange: "RANGE_1000_2500",
    price: 1500,
    rating: 4.8,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Folk & Soul",
    genre: "FOLK", // Legacy field
    genres: ["FOLK", "COUNTRY"],
    bio: "Acoustic duo playing heartfelt folk and country music, perfect for intimate venues",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    city: "Nashville", // Legacy field
    location: "Nashville, TN, USA",
    languages: ["ENGLISH"],
    feeRange: "RANGE_500_1000",
    price: 800,
    rating: 4.5,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
];

export const artistResolvers = {
  Query: {
    getArtists: () => mockArtists,
    getArtist: (parent: any, args: { id: string }) => mockArtists.find((artist) => artist.id === args.id),
    searchArtists: (parent: any, args: { query: string }) =>
      mockArtists.filter((artist) => artist.name.toLowerCase().includes(args.query.toLowerCase()) || artist.genre.toLowerCase().includes(args.query.toLowerCase())),
  },
  Mutation: {
    createArtist: (parent: any, args: { input: any }) => {
      const newArtist = {
        id: String(mockArtists.length + 1),
        ...args.input,
        // Add legacy fields for backward compatibility
        genre: args.input.genres?.[0] || "OTHER",
        city: args.input.location?.split(",")[0] || args.input.location,
        rating: 0,
        managerId: "2",
        createdAt: new Date().toISOString(),
      };
      mockArtists.push(newArtist);
      return newArtist;
    },
    updateArtist: (parent: any, args: { id: string; input: any }) => {
      const artistIndex = mockArtists.findIndex((artist) => artist.id === args.id);
      if (artistIndex === -1) throw new Error("Artist not found");

      const updatedArtist = {
        ...mockArtists[artistIndex],
        ...args.input,
        // Update legacy fields for backward compatibility
        genre: args.input.genres?.[0] || mockArtists[artistIndex].genre,
        city: args.input.location?.split(",")[0] || args.input.location || mockArtists[artistIndex].city,
      };

      mockArtists[artistIndex] = updatedArtist;
      return updatedArtist;
    },
    deleteArtist: (parent: any, args: { id: string }) => {
      const artistIndex = mockArtists.findIndex((artist) => artist.id === args.id);
      if (artistIndex === -1) return false;

      mockArtists.splice(artistIndex, 1);
      return true;
    },
  },
  // Helper function for relationships
  getArtistById: (id: string) => mockArtists.find((artist) => artist.id === id),
};
