import User from '../../models/User.js'
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql';

const secret = process.env.SECRET

const authResolvers = {
  Query: {
    getCurrentUser: async(_, args, context) => context.user
  },
  Mutation: {
    logIn: async(_, {username, password}, context) => {
      const user = await User.findOne({username})

      const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        throw new GraphQLError('Wrong username or password!');
      }
      
      const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      const token = jwt.sign(
        userForToken, 
        secret,
        { expiresIn: 60*60 }
      )

      return token
    },

    register: async(_, {displayName, username, email, chef, password}, context) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = new User({
        displayName,
        username,
        email,
        chef,
        passwordHash,
      })

      const savedUser = await user.save()

      const userForToken = {
        username: savedUser.username,
        id: savedUser._id,
      }
    
      const token = jwt.sign(
        userForToken, 
        secret,
        { expiresIn: 60*60 }
      )

      return token          
    }
  }
}
export default authResolvers