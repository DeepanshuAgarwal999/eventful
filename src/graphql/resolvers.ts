import { artistResolvers } from "./resolvers/artist.resolvers";
import { bookingResolvers } from "./resolvers/booking.resolvers";
import { userResolvers } from "./resolvers/user.resolvers";


export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...artistResolvers.Query,
    ...bookingResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...artistResolvers.Mutation,
    ...bookingResolvers.Mutation,
  },
  // Relationship resolvers
  Artist: {
    manager: (artist: any) => userResolvers.getUserById(artist.managerId),
  },
  Booking: {
    eventPlanner: (booking: any) => userResolvers.getUserById(booking.eventPlannerId),
    artist: (booking: any) => artistResolvers.getArtistById(booking.artistId),
  },
};
