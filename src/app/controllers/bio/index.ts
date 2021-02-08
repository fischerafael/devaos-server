import { Request, Response } from 'express'
import Bio from '../../../database/Models/Bio'
import User from '../../../database/Models/User'
import { formatResponse } from '../../../helpers'

interface IBody {
    bio: string
}

interface IReq extends Request {
    body: IBody
}

const BioController = {
    async create(req: Request, res: Response) {
        try {
            const { body, params } = req as IReq

            const { status, data } = await BioService.create({
                bio: body.bio,
                user: params.user_id
            })

            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const { params } = req as IReq

            const { status, data } = await BioService.delete(params.user_id)

            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default BioController

interface IBioService {
    bio: string
    user: string
}

export const BioService = {
    async create(data: IBioService) {
        const { bio, user } = data

        const hasUser = await User.findById(user)
        if (!hasUser) return formatResponse(404, 'User does not exist')

        const hasBio = await Bio.findOne({ user: user })
        if (hasBio) return formatResponse(403, 'User already has a bio')

        const userBio = await Bio.create({ user, bio })

        return formatResponse(201, userBio)
    },
    async delete(user: string) {
        const deletedBio = await Bio.findOneAndRemove({ user: user })
        if (!deletedBio) return formatResponse(404, 'Bio did not exist')

        return formatResponse(200, { deleted: 'ok', deletedBio })
    }
}
