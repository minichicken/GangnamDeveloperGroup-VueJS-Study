import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, minlength: 8 },
    realname: { type: String, required: true },
    password: { type: String }
})

export default mongoose.model('User', UserSchema)
