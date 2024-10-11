import AsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import bcrpyt from 'bcrypt'
import User from '../models/User.js'

export const login = AsyncHandler(async (req, res) => {
    console.log('login called')
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(404).json({ message: 'No username or password input' })
    }

    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser) {
        return res.status(404).json({ message: 'Invalid username or password' })
    }

    const match = await bcrpyt.compare(password, foundUser.password)
    if (!match) {
        return res.status(400).json({ message: 'Invalid password or username' })
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    )
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '2m' }
    )

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 1000 * 60 * 60 * 24 * 7 })

    res.json({ accessToken })

})

export const refresh = AsyncHandler(async (req, res) => {
    console.log('refresh called')

    const cookies = req.cookies

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        AsyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' })
            }

            const foundUser = await User.findOne({ username: decoded.username }).exec()
            if (!foundUser) {
                return res.status(404).json({ message: 'Username is invalid' })
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )

            res.json({accessToken})
        })
    )
})

export const logout = AsyncHandler( async(req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.sendStatus(409)
    }

    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'})
    res.json({message: 'cookie cleared'})
})