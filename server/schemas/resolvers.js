const { User, Book } = require("../models");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate("books");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("books");
    },
  },
};

module.exports = resolvers;
