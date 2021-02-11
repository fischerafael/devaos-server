import mongoose from 'mongoose'

interface IUserModel extends mongoose.Document {
    github: string
    email: string
    password: string
    links: {
        linkedin?: string
        blog?: string
    }
    personal: {
        name: string
        avatar: string
        location: string
        title: string
    }
    skills?: string[]
    experiences?: string[]
    bio?: string
}

const Schema = new mongoose.Schema({
    github: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    links: {
        linkedin: String,
        blog: String
    },
    personal: {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
        location: { type: String, required: true },
        title: { type: String, required: true }
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    bio: { type: mongoose.Schema.Types.ObjectId, ref: 'Bio' }
})

export default mongoose.model<IUserModel>('User', Schema)
