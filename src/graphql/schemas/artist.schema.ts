import { gql } from "graphql-tag";

export const artistSchema = gql`
  enum Genre {
    ROCK
    POP
    JAZZ
    CLASSICAL
    ELECTRONIC
    HIPHOP
    COUNTRY
    BLUES
    REGGAE
    FOLK
    COMEDY
    MAGIC
    DANCE
    THEATER
    OTHER
  }

  enum Language {
    ENGLISH
    SPANISH
    FRENCH
    GERMAN
    ITALIAN
    PORTUGUESE
    CHINESE
    JAPANESE
    KOREAN
    ARABIC
    HINDI
    RUSSIAN
    OTHER
  }

  enum FeeRange {
    UNDER_500
    RANGE_500_1000
    RANGE_1000_2500
    RANGE_2500_5000
    RANGE_5000_10000
    OVER_10000
  }

  type Artist {
    id: ID!
    name: String!
    genres: [Genre!]!
    bio: String!
    image: String
    location: String!
    languages: [Language!]!
    feeRange: FeeRange!
    price: Float!
    rating: Float
    managerId: ID!
    manager: User!
    createdAt: String!
    # Legacy field for backward compatibility
    genre: Genre!
    city: String!
  }

  input CreateArtistInput {
    name: String!
    genres: [Genre!]!
    bio: String!
    image: String
    location: String!
    languages: [Language!]!
    feeRange: FeeRange!
    price: Float!
  }
  extend type Query {
    getArtists: [Artist!]!
    getArtist(id: ID!): Artist
    searchArtists(query: String!): [Artist!]!
  }

  extend type Mutation {
    createArtist(input: CreateArtistInput!): Artist!
    updateArtist(id: ID!, input: CreateArtistInput!): Artist!
    deleteArtist(id: ID!): Boolean!
  }
`;
