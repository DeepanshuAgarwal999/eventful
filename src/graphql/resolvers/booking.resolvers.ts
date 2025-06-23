// Mock data for bookings
export const mockBookings = [
  {
    id: "1",
    eventPlannerId: "1",
    artistId: "1",
    eventName: "Summer Music Festival",
    eventDate: "2025-07-15",
    price: 5000,
    status: "CONFIRMED",
    message: "Looking forward to working with you!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    eventPlannerId: "1",
    artistId: "2",
    eventName: "Corporate Gala",
    eventDate: "2025-08-20",
    price: 3500,
    status: "PENDING",
    message: "Perfect for our corporate event",
    createdAt: new Date().toISOString(),
  },
];

export const bookingResolvers = {
  Query: {
    getBookings: () => mockBookings,
    getBooking: (parent: any, args: { id: string }) => mockBookings.find((booking) => booking.id === args.id),
    getMyBookings: () => mockBookings.filter((booking) => booking.eventPlannerId === "1"),
  },
  Mutation: {
    createBooking: (parent: any, args: { input: any }) => {
      const newBooking = {
        id: String(mockBookings.length + 1),
        eventPlannerId: "1", // Current user
        status: "PENDING",
        ...args.input,
        createdAt: new Date().toISOString(),
      };
      mockBookings.push(newBooking);
      return newBooking;
    },
    updateBookingStatus: (parent: any, args: { id: string; status: string }) => {
      const bookingIndex = mockBookings.findIndex((booking) => booking.id === args.id);
      if (bookingIndex === -1) throw new Error("Booking not found");

      mockBookings[bookingIndex].status = args.status;
      return mockBookings[bookingIndex];
    },
  },
};
