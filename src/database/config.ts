import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

async function configMongoDB() {
    if (!MONGO_URL) {
        console.log('Failed to connect to MongoDB')
        return
    }
    await mongoose.connect(
        MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log('Connected to MongoDB')
    )
}

export default configMongoDB
