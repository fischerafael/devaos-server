import mongoose from 'mongoose'

interface IBioModel extends mongoose.Document {
    bio: string
    user: string
}

const Schema = new mongoose.Schema({
    bio: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export default mongoose.model<IBioModel>('Bio', Schema)
