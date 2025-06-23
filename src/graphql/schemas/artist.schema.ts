import { gql } from "graphql-tag";

export const artistSchema = gql`
  enum Genre {
    ROCK
    POP
    JAZZ
    CLASSICAL
    ELECTRONIC
  }

  type Artist {
    id: ID!
    name: String!
    genre: Genre!
    bio: String!
    image: String
    city: String!
    price: Float!
    rating: Float
    managerId: ID!
    manager: User!
    createdAt: String!
  }

  input CreateArtistInput {
    name: String!
    genre: Genre!
    bio: String!
    image: String
    city: String!
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
