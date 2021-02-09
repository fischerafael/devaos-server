import { ExperiencesService } from '../../../services/experiences'

import { Request, Response } from 'express'

interface IBody {
    title: string
    institution: string
    location: string
    startedAt?: number
    finishedAt?: number
    description?: string
}

interface IReq extends Request {
    body: IBody
}

const ExperiencesController = {
    async create(req: Request, res: Response) {
        try {
            const { body, params } = req as IReq

            const { status, data } = await ExperiencesService.create({
                type: params.type,
                title: body.title,
                institution: body.institution,
                location: body.location,
                user: params.user_id,
                startedAt: body.startedAt,
                finishedAt: body.finishedAt,
                description: body.description
            })

            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const { params } = req

            const { status, data } = await ExperiencesService.delete({
                userId: params.user_id,
                expId: params.exp_id
            })

            return res.status(status).json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default ExperiencesController
