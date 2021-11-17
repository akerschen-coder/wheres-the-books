const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
                // can I put {username} her instead?? 
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        // add new user 
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        //login user 
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }, 

        //save book
        // saved books or input?
        saveBook: async (parent, { input }, context) => {
            if(context.user) {
                const updated = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    //push or addtoSet???
                    {$push: { savedBooks: { input }} },
                    { new: true },
                );
                return updated;
            }
            throw new AuthenticationError('Gotta be logged in!')
        },
        //remove book
        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                const updated = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {$pull: { savedBooks: { bookId }} },
                    { new: true },
                );
                return updated;
            }
            throw new AuthenticationError('Gotta be logged in!')
        }

        
    }
}


