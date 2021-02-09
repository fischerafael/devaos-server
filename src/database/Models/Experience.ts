import mongoose from 'mongoose'

interface IExpModel extends mongoose.Document {
    type: 'professional' | 'education'
    title: string
    institution: string
    location: string
    startedAt?: number
    finishedAt?: number
    description?: string
    user: string
}

const Schema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    startedAt: { type: Number },
    finishedAt: { type: Number },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model<IExpModel>('Experience', Schema)
