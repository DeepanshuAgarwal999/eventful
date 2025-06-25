import { gql } from "graphql-tag";

export const bookingSchema = gql`
  enum BookingStatus {
    PENDING
    CONFIRMED
    DECLINED
    CANCELLED
  }

  type Booking {
    id: ID!
    eventPlannerId: ID!
    eventPlanner: User!
    artistId: ID!
    artist: Artist!
    eventName: String!
    eventDate: String!
    price: Float!
    status: BookingStatus!
    message: String
    createdAt: String!
  }

  input CreateBookingInput {
    artistId: ID!
    eventName: String!
    eventDate: String!
    price: Float!
    message: String
  }
  extend type Query {
    getBookings: [Booking!]!
    getBooking(id: ID!): Booking
    getMyBookings: [Booking!]!
    getManagerBookings: [Booking!]!
  }

  extend type Mutation {
    createBooking(input: CreateBookingInput!): Booking!
    updateBookingStatus(id: ID!, status: BookingStatus!): Booking!
  }
`;
