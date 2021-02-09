import { Request, Response } from 'express'
import User from '../../../database/Models/User'
import { formatResponse } from '../../../helpers'

const ProfileController = {
    async show(req: Request, res: Response) {
        try {
            const { status, data } = await ProfileServices.show(
                req.params.github
            )

            return res.status(status).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}

export default ProfileController

export const ProfileServices = {
    async show(github: string) {
        const user = await User.findOne({ github: github })
            .populate('skills')
            .populate('experiences')
            .populate('bio')
        if (!user) return formatResponse(404, { data: 'Not Found' })

        user.password = undefined

        return formatResponse(200, user)
    }
}
