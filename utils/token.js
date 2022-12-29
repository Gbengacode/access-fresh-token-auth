import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET)
}
export const sendAccessToken = (res, token, result  ) => {
    return res.json({ token, result })
}