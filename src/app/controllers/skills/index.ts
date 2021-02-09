import { Request, Response } from 'express'

import { SkillsServices } from '../../../services/skills'

interface IBody {
    title: string
    description?: string
}

interface IReq {
    body: IBody
}

const SkillsController = {
    async create(req: Request, res: Response) {
        try {
            const { body } = req as IReq

            const { status, data } = await SkillsServices.create({
                ...body,
                user: req.params.user_id
            })

            return res.status(status).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const { status, data } = await SkillsServices.delete({
                skillId: req.params.skill_id,
                userId: req.params.user_id
            })

            return res.status(status).json(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }
}

export default SkillsController
