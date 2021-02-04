interface IUser {
    github: string
    email: string
    password: string
    personal?: {
        name: string
        avatar: string
        location: string
        bio: string
    }
    links?: {
        type: string
        url: string
    }[]
}
