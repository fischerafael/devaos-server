import { Request, Response } from 'express'
import Skill from '../../../database/Models/Skill'
import User from '../../../database/Models/User'
import { formatResponse } from '../../../helpers'

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
    }
}

export default SkillsController

const MAX_SKILLS = 10

export const SkillsServices = {
    async create(data: { title: string; description?: string; user: string }) {
        const hasUser = await User.findById(data.user)
        if (!hasUser) return formatResponse(404, 'User does not exist')

        const hasOverMax = await Skill.find({ user: data.user })
        if (hasOverMax >= MAX_SKILLS)
            return formatResponse(
                403,
                `Maximum of ${MAX_SKILLS} skills reached`
            )

        const skill = await Skill.create({
            title: data.title,
            description: data.description
        })

        return formatResponse(200, skill)
    }
}
