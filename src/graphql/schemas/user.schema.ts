import { gql } from "graphql-tag";

export const userSchema = gql`
  enum UserRole {
    EVENT_PLANNER
    ARTIST_MANAGER
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    company: String
    phone: String
    avatar: String
    createdAt: String!
  }
  extend type Query {
    me: User
    getUsers: [User!]!
  }

  extend type Mutation {
    updateProfile(name: String, company: String, phone: String): User!
  }
`;
