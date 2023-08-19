import mongoose,{Schema, model, models} from 'mongoose'


const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
          
    },
})

const Login = mongoose.models.Login || mongoose.model("Login", LoginSchema)

export default Login