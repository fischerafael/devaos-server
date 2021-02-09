import Skill from '../../database/Models/Skill'
import User from '../../database/Models/User'
import { formatResponse } from '../../helpers'

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
            description: data.description,
            user: data.user
        })

        hasUser.skills.push(skill)
        await hasUser.save()

        return formatResponse(200, skill)
    },
    async delete(data: { skillId: string; userId: string }) {
        const hasUser = await User.findById(data.userId)
        if (!hasUser) return formatResponse(404, 'User does not exist')

        const belongsToUser = await Skill.findOne({ user: data.userId })
        if (!belongsToUser) return formatResponse(409, 'Operation not allowed')

        const deletedSkill = await Skill.findByIdAndRemove(data.skillId)
        if (!deletedSkill)
            return formatResponse(404, 'Experience did not exist')

        hasUser.skills.pull(deletedSkill)
        await hasUser.save()

        return formatResponse(200, { deleted: 'ok', deletedSkill })
    }
}
