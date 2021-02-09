import mongoose from 'mongoose'

interface ISkillModel extends mongoose.Document {
    title: string
    description?: string
    user: string
}

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model<ISkillModel>('Skill', Schema)
