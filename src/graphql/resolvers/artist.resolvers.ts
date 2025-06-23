// Mock data for artists
export const mockArtists = [
  {
    id: "1",
    name: "The Electric Storm",
    genre: "ROCK",
    bio: "High-energy rock band with 10+ years experience",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    city: "Los Angeles",
    price: 5000,
    rating: 4.8,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jazz Collective",
    genre: "JAZZ",
    bio: "Smooth jazz ensemble perfect for corporate events",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300",
    city: "New York",
    price: 3500,
    rating: 4.9,
    managerId: "2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "DJ Luna",
    genre: "ELECTRONIC",
    bio: "Electronic music producer and DJ",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
    city: "Miami",
    price: 2500,
    rating: 4.7,
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

      mockArtists[artistIndex] = { ...mockArtists[artistIndex], ...args.input };
      return mockArtists[artistIndex];
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
