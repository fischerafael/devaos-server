import mongoose from 'mongoose'

interface ISkillModel extends mongoose.Document {
    title: string
    description?: string
}

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }
})

export default mongoose.model<ISkillModel>('Skill', Schema)
