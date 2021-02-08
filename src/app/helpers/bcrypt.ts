import bcrypt from 'bcryptjs'

export async function hashPassword(password: string, saltRounds?: number) {
    try {
        const rounds = saltRounds || 10
        const salt = await bcrypt.genSalt(rounds)

        const hashedPassword = await bcrypt.hash(password, salt)
        if (!hashedPassword) return password

        return hashedPassword
    } catch (err) {
        return err
    }
}

export async function validatePassword(
    password: string,
    hashedPassword: string
) {
    try {
        const isValid = await bcrypt.compare(password, hashedPassword)
        return isValid
    } catch (err) {
        return err
    }
}
