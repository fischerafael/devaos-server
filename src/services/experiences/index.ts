import Experience from '../../database/Models/Experience'
import User from '../../database/Models/User'

import { formatResponse } from '../../helpers'

interface IExpService {
    type: string
    title: string
    institution: string
    location: string
    startedAt?: number
    finishedAt?: number
    description?: string
    user: string
}

const MAX_EXP = 20

export const ExperiencesService = {
    async create(data: IExpService) {
        const hasUser = await User.findById(data.user)
        if (!hasUser) return formatResponse(404, 'User does not exist')

        const hasOverMax = await Experience.find({ user: data.user })
        if (hasOverMax >= MAX_EXP)
            return formatResponse(
                403,
                `Maximum of ${MAX_EXP} experiences reached`
            )

        const experience = await Experience.create({
            type: data.type,
            title: data.title,
            institution: data.institution,
            location: data.location,
            user: data.user,
            startedAt: data.startedAt,
            finishedAt: data.finishedAt,
            description: data.description
        })

        hasUser.experiences.push(experience)
        await hasUser.save()

        return formatResponse(200, experience)
    },
    async delete(data: { userId: string; expId: string }) {
        const hasUser = await User.findById(data.userId)
        if (!hasUser) return formatResponse(404, 'User does not exist')

        const belongsToUser = await Experience.findOne({ user: data.userId })
        if (!belongsToUser) return formatResponse(409, 'Operation not allowed')

        const deletedExp = await Experience.findByIdAndRemove(data.expId)
        if (!deletedExp) return formatResponse(404, 'Experience did not exist')

        hasUser.experiences.pull(deletedExp)
        await hasUser.save()

        return formatResponse(200, { deleted: 'ok', deletedExp })
    }
}
