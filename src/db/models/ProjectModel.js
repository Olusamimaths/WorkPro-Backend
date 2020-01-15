import mongoose from 'mongoose'

const { Schema } = mongoose

const ProjectSchema = new Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    stories: [mongoose.ObjectId],
    createdBy: mongoose.ObjectId,
    assignedTo: [mongoose.ObjectId]
})

const Project = mongoose.model('Project', ProjectSchema)

export default Project
