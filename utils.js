import User from './models/User.js'
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config'
import { GraphQLError } from 'graphql'

const getTokenFrom = token => {
  if (token && token.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


 const userExtractor = async(token) => {
  const splitToken = await getTokenFrom(token)
  if(splitToken){
    const decodedToken = jwt.verify(splitToken, process.env.SECRET)
    if (!decodedToken.id) {
      throw new GraphQLError('token invalid');
    }
    const user = await User.findById(decodedToken.id)
    return User
  }
}

export default userExtractor


