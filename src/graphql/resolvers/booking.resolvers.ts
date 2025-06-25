// Mock data for bookings
export const mockBookings = [
  {
    id: "1",
    eventPlannerId: "1",
    artistId: "1", // The Electric Storm - manager "2"
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
    artistId: "2", // Jazz Collective - manager "2"
    eventName: "Corporate Gala",
    eventDate: "2025-08-20",
    price: 3500,
    status: "PENDING",
    message: "Perfect for our corporate event",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    eventPlannerId: "3",
    artistId: "1", // The Electric Storm - manager "2"
    eventName: "Wedding Reception",
    eventDate: "2025-06-30",
    price: 4500,
    status: "PENDING",
    message: "We'd love to have you perform at our wedding reception",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    eventPlannerId: "3",
    artistId: "3", // DJ Luna - manager "2"
    eventName: "Club Opening Night",
    eventDate: "2025-07-05",
    price: 2500,
    status: "DECLINED",
    message: "Electronic music for grand opening",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    eventPlannerId: "1",
    artistId: "2", // Jazz Collective - manager "2"
    eventName: "Hotel Lounge Performance",
    eventDate: "2025-08-10",
    price: 3000,
    status: "CONFIRMED",
    message: "Monthly jazz performance at upscale hotel",
    createdAt: new Date().toISOString(),
  },
];

export const bookingResolvers = {
  Query: {
    getBookings: () => mockBookings,
    getBooking: (parent: any, args: { id: string }) => mockBookings.find((booking) => booking.id === args.id),
    getMyBookings: () => mockBookings.filter((booking) => booking.eventPlannerId === "1"),
    getManagerBookings: () => mockBookings, // Return all bookings
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
