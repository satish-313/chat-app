export default {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: "john",
          email: "john@gmail.com",
        },
        {
          username: "john1",
          email: "john1@gmail.com",
        },
        {
          username: "john2",
          email: "john2@gmail.com",
        },
      ];

      return users;
    },
  },
};
