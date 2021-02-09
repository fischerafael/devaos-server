import { BioService } from '../../../services/bio'

import { Request, Response } from 'express'

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
            const { params } = req

            const { status, data } = await BioService.delete(params.user_id)

            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default BioController
