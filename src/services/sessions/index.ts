import User from '../../database/Models/User'

import { validatePassword } from '../../app/helpers/bcrypt'
import { formatResponse } from '../../helpers'

interface IBody {
    github: string
    password: string
}

export const SessionsService = {
    async create(body: IBody) {
        const { github, password } = body

        const user: { password: string } = await User.findOne({ github })
        if (!user) return formatResponse(404, 'User not found')

        const isPasswordValid = await validatePassword(password, user.password)
        if (!isPasswordValid) return formatResponse(403, 'Invalid password')

        user.password = ''

        return formatResponse(200, user)
    }
}
