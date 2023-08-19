import { connectToDB } from "@utils/database";
import Register from '@models/registerSchema'
import bcryptjs from 'bcryptjs'




export const POST = async(req, res) => {
    const reqBody = await req.json()
    const {email, password, username} = reqBody
    
    try{
       await connectToDB()
       

    const userExist = await Register.findOne({email})

    if(userExist){
        return new Response(JSON.stringify({error: "User already exist"}, {status: 400}))
    }

    //hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    
       const newUser = new Register({
            email,
            password: hashedPassword,
            username
        })
        
       const savedUser = await newUser.save()
    return new Response(JSON.stringify({message: "User created successfully"}, savedUser), {status: 200})
    }catch(error){
        console.log(error)
        return new Response('Failed to signup', {status: 500})
    }
}