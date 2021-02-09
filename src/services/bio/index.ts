import Bio from '../../database/Models/Bio'
import User from '../../database/Models/User'
import { formatResponse } from '../../helpers'

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
