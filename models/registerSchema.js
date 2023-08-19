import mongoose,{Schema, model, models} from 'mongoose'


const RegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],     
    },
    username:{
        type: String
    }
})

const Register = mongoose.models.Register || mongoose.model("Register", RegisterSchema)

export default Register