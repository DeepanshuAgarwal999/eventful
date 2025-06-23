# GraphQL Setup for Artist Booking Platform

A simplified GraphQL API for the Artistly.com performing artist booking platform.

## Features

- **Users**: Event planners and artist managers
- **Artists**: Musicians with genres, pricing, and profiles
- **Bookings**: Event booking requests and management

## Schema Structure

The GraphQL schema is split into separate files:

- `user.schema.ts` - User types and operations
- `artist.schema.ts` - Artist types and operations
- `booking.schema.ts` - Booking types and operations

## Mock Data Included

- 2 sample users (1 event planner, 1 artist manager)
- 3 sample artists (Rock band, Jazz collective, DJ)
- 2 sample bookings (1 confirmed, 1 pending)

## API Endpoint

GraphQL Playground available at: `/api/graphql`

## Sample Queries

### Get all artists:

```graphql
query {
  getArtists {
    id
    name
    genre
    price
    city
    rating
  }
}
```

### Create a booking:

```graphql
mutation {
  createBooking(input: { artistId: "1", eventName: "Wedding Reception", eventDate: "2025-09-15", price: 3000, message: "Looking for a great band!" }) {
    id
    status
    eventName
  }
}
```

### Search artists:

```graphql
query {
  searchArtists(query: "jazz") {
    name
    genre
    city
    price
  }
}
```

## Usage

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/api/graphql` for GraphQL Playground
3. Use the sample queries above to test the API
