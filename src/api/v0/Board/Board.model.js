import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Comment = new Schema({
    name: { type: String },
    comment: { type: String }
})

const BoardSchema = new Schema({
    name: { type: String },
    date: { type: String },
    content: { type: String },
    comment: [Comment]
})

export default mongoose.model('Board', BoardSchema)
