import {Schema, model, models} from 'mongoose'


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required']
    },
    username:{
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, `The string must have a length between 8 and 20 characters.
        The string must not start or end with an underscore or a period.
        The string must not contain two consecutive underscores or periods.
        The string can contain alphanumeric characters, periods, and underscores, but not as the first or last character.`]
    },
    image:{
        type: String
    }
})

const User = models.User || model("User", UserSchema)

export default User