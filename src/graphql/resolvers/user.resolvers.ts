// Mock data for users
export const mockUsers = [
  {
    id: "1",
    email: "john@eventco.com",
    name: "John Smith",
    role: "EVENT_PLANNER",
    company: "Event Co.",
    phone: "+1-555-0101",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "sarah@artistmgmt.com",
    name: "Sarah Johnson",
    role: "ARTIST_MANAGER",
    company: "Artist Management Inc.",
    phone: "+1-555-0102",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    createdAt: new Date().toISOString(),
  },
];

export const userResolvers = {
  Query: {
    me: () => mockUsers[0],
    getUsers: () => mockUsers,
  },
  Mutation: {
    updateProfile: (parent: any, args: any) => {
      const user = mockUsers[0];
      return { ...user, ...args };
    },
  },
  // Helper function for relationships
  getUserById: (id: string) => mockUsers.find((user) => user.id === id),
};
