import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
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

const Schema = new mongoose.Schema({
    github: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    personal: {
        name: String,
        avatar: String,
        location: String,
        bio: String
    },
    links: [
        {
            type: String,
            url: String
        }
    ]
})

export default mongoose.model<IUserModel>('User', Schema)
