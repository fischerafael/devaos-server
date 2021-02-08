import { SessionsService } from '../../../services/sessions'
import { Request, Response } from 'express'

interface IBody {
    github: string
    password: string
}

interface IReq {
    body: IBody
}

const SessionsController = {
    async create(req: Request, res: Response) {
        try {
            const { body } = req as IReq

            const { status, data } = await SessionsService.create(body)

            return res.status(status).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}

export default SessionsController
