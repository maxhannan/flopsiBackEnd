import User from './models/User.js'
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config'
import { GraphQLError } from 'graphql'

const getTokenFrom = token => {
  console.log(token)
  if (token && token.startsWith('Bearer ')) {
    console.log('inside')
    return token.replace('Bearer ', '')
  }
  return null
}

 const userExtractor = async(token) => {
  const splitToken = await getTokenFrom(token)
  const secret =  process.env.SECRET
  if(splitToken){
    const decodedToken = jwt.verify(splitToken, secret)
    if (!decodedToken.id) {
      throw new GraphQLError('token invalid');
    }
    const user = await User.findById(decodedToken.id)
    return user
  }
}

export default userExtractor


