import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    local: {
        name: { type: String, required: true},
        email: { type: String, required: true },
        password: { type: String }
    }
})

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null))
}

UserSchema.methods.validPassword = (password)=>{
    return bcrypt.compareSync(password, this.local.password);
}

export default mongoose.model('User', UserSchema)
