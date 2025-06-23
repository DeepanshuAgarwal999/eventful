import { mergeTypeDefs } from "@graphql-tools/merge";
import { userSchema } from "./schemas/user.schema";
import { artistSchema } from "./schemas/artist.schema";
import { bookingSchema } from "./schemas/booking.schema";
import { baseSchema } from "./schemas/base.schema";

export const typeDefs = mergeTypeDefs([baseSchema, userSchema, artistSchema, bookingSchema]);
