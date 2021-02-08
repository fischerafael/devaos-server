import { Request, Response } from 'express'
import axios from 'axios'

import User from '../../database/Models/User'

import { hashPassword } from '../helpers/bcrypt'

const UserController = {
    async create(req: Request, res: Response) {
        try {
            const {
                github,
                email,
                password,
                name,
                avatar,
                location,
                bio,
                title
            } = req.body as IUser

            const existingUser = await User.findOne({ github: github })
            if (existingUser) return res.status(409).json('User already exists')

            const githubUser = await axios.get(
                `https://api.github.com/users/${github}`
            )
            if (!githubUser)
                return res.status(404).json('Github user not found')

            const hashedPassword = await hashPassword(password)

            const user = await User.create({
                github,
                email,
                password: hashedPassword,
                personal: {
                    name,
                    avatar,
                    bio,
                    location,
                    title
                }
            })

            return res.status(201).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default UserController
