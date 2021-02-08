import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
    github: string
    email: string
    password: string
    personal: {
        name: string
        avatar: string
        location: string
        bio: string
        title: string
    }
}

const Schema = new mongoose.Schema({
    github: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    personal: {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
        location: { type: String, required: true },
        bio: { type: String, required: true },
        title: { type: String, required: true }
    }
})

export default mongoose.model<IUserModel>('User', Schema)
