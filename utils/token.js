import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const generateTokens = (res, userInfo) => {
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s'})
    const refreshToken =  jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'})
    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        secure: true,
        sameSite: 'None', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })
    
    
    return accessToken
}


